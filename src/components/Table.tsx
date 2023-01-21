import { useMemo, useState, useLayoutEffect, useEffect, useRef } from "react"
import "../styles/table.scss"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	FilterFn,
	ColumnDef,
} from "@tanstack/react-table"
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils"
// import LoadingSpinner from "./Loader"
import { usePagination } from "../hooks/usePaginate"
import { ReactComponent as More } from "../assets/icons/more.svg"
import { ReactComponent as Sorter } from "../assets/icons/sorter.svg"
import { ReactComponent as Arrow } from "../assets/icons/arrow.svg"
import { useDashboardContext } from "../context/DashboardContext/DashboardContext"

declare module "@tanstack/table-core" {
	interface FilterFns {
		fuzzy: FilterFn<unknown>
	}
	interface FilterMeta {
		itemRank: RankingInfo
	}
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value)
	addMeta({
		itemRank,
	})
	return itemRank.passed
}

export type TableProps = {
	data: any[]
	tableActionButtons?: {
		label: string | JSX.Element
		clickHandler: (e: React.MouseEvent<HTMLElement>) => void
	}[][]
	extraElements?: {
		content: string
		className: string
	}[]
	extraElementName?: string
	pending?: boolean
}

const CustomTable = ({
	data,
	tableActionButtons,
	extraElements,
	pending,
	extraElementName,
}: TableProps) => {
	const columnHelper = createColumnHelper<any>()
	const [sorting, setSorting] = useState<SortingState>([])
	const { hits_per_page, setHits } = useDashboardContext()

	const tableData = useMemo(() => [...data], [data])
	const columns = useMemo<ColumnDef<any>[]>(
		() =>
			tableData[0]
				? Object.keys(tableData[0])
						?.filter(item => item !== "columnAction")
						?.map(datum =>
							columnHelper.accessor(datum, {
								header: datum,
								id: datum,
							})
						)
				: [],
		[data]
	)
	const extraColumns = extraElements
		? useMemo<ColumnDef<any>[]>(
				() => [
					{
						id: extraElementName ? extraElementName?.split(" ")?.join("") : "",
						header: extraElementName,
						cell: ({ row }) => {
							const { content, className } = extraElements[row.index]
							return (
								<>
									{content ? (
										<span
											className={className}
											key={row.index}
										>
											{content}
										</span>
									) : null}
								</>
							)
						},
					},
				],
				[data, extraElements]
		  )
		: useMemo(() => [], [data, extraElements])
	const actionColumns = tableActionButtons
		? useMemo<ColumnDef<string>[]>(
				() => [
					{
						id: "select",
						header: "",
						cell: ({ row }) =>
							tableActionButtons[row.index]?.map(btn => <More key={row.index} />),
					},
				],
				[tableActionButtons, data]
		  )
		: useMemo(() => [], [data, tableActionButtons])

	const finalColumns = useMemo(
		() => [...columns, ...extraColumns, ...actionColumns],
		[columns, extraColumns, actionColumns]
	)

	const table = useReactTable({
		data,
		columns: finalColumns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
	})
	useLayoutEffect(() => {
		table.setPageSize(hits_per_page)
	}, [hits_per_page])

	const onHitsChange = (hits: number) => {
		setHits(hits)
	}

	const ref = useRef(false)
	useEffect(() => {
		return () => {
			ref.current = false
		}
	}, [])

	const pageList = usePagination({
		totalPages: table.getPageCount(),
		currentPage: table.getState().pagination.pageIndex + 1,
		siblingCount: 1,
	})
	const handlePageChange = (selected: number) => {
		if (selected == table.getState().pagination.pageIndex + 1) {
			return
		}
		table.setPageIndex(selected - 1)
		window.scrollTo(0, 0)
	}

	return (
		<div className='table-container'>
			{pending ? (
				"Loading..."
			) : data.length == 0 ? (
				"No results.."
			) : (
				<>
					<div className='parent'>
						<table className='table'>
							<thead>
								{table.getHeaderGroups().map(headerGroup => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map(header => (
											<th
												key={header.id}
												className='table__head'
											>
												{header.isPlaceholder ? null : (
													<div
														{...{
															onClick: header.column.getToggleSortingHandler(),
														}}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{{
															asc: <Sorter className='asc' />,
															desc: <Sorter />,
														}[header.column.getIsSorted() as string] ?? null}
													</div>
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map(row => (
									<tr
										onClick={row.original.columnAction}
										key={row.id}
										className='table__body-row'
									>
										{row.getVisibleCells().map(cell => (
											<td key={cell.id}>
												<div>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='actions'>
						<div className='actions__info'>
							<p>Showing</p>
							<select
								name=''
								id=''
								onChange={e => onHitsChange(+e.target.value)}
								defaultValue='10'
							>
								<option value='10'>10</option>
								<option value='20'>20</option>
								<option value='50'>50</option>
								<option value='100'>100</option>
							</select>
							<p>out of {data?.length}</p>
						</div>

						<div className='actions__page'>
							<button
								onClick={() => {
									table.previousPage()
									window.scrollTo(0, 0)
								}}
								disabled={!table.getCanPreviousPage()}
								className='actions__next-btn'
							>
								<Arrow opacity={!table.getCanPreviousPage() ? "0.6" : "1"} />
							</button>
							<div className='actions__btn-cont'>
								{pageList
									? pageList.map((item, idx) => {
											if (item === "...") {
												return <p key={idx + item}>&#8230;</p>
											} else {
												return (
													<button
														key={item}
														onClick={() => handlePageChange(item as number)}
														className={`actions__page-btns${
															table.getState().pagination.pageIndex + 1 === item
																? "--current "
																: ""
														}`}
													>
														{item}
													</button>
												)
											}
									  })
									: null}
							</div>
							<button
								onClick={() => {
									table.nextPage()
									window.scrollTo(0, 0)
								}}
								disabled={!table.getCanNextPage()}
								className='actions__next-btn'
							>
								<Arrow opacity={!table.getCanNextPage() ? "0.6" : "1"} />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default CustomTable
