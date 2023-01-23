const SkeletonLoader = (props: { style: { width: number; height: number }; shape: string }) => {
	return (
		<span
			className={`loader${props.shape === "circle" ? "--circle" : ""}`}
			style={props.style}
		></span>
	)
}

export default SkeletonLoader
