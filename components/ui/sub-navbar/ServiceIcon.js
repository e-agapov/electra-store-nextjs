const ServiceIcon = (props) => {
	return (
		<span {...props}>
			<svg width="16" height="16" viewBox="0 0 16 16">
				<g clipPath="url(#clip0_119_92)">
					<path
						d="M8.50206 16H7.49791C6.68575 16 6.02497 15.3393 6.02497 14.5271V14.1874C5.67969 14.0771 5.34422 13.9378 5.02194 13.771L4.78119 14.0118C4.19809 14.5956 3.26406 14.5785 2.69791 14.0116L1.98819 13.3019C1.42103 12.7353 1.40472 11.8016 1.98837 11.2186L2.22894 10.978C2.06216 10.6558 1.92294 10.3203 1.81259 9.975H1.47291C0.660781 9.975 0 9.31425 0 8.50209V7.49791C0 6.68575 0.660781 6.025 1.47294 6.025H1.81263C1.92297 5.67969 2.06219 5.34425 2.22897 5.02197L1.98822 4.78125C1.40491 4.19856 1.421 3.26475 1.98841 2.69797L2.69819 1.98822C3.26566 1.41997 4.19947 1.40578 4.78144 1.98841L5.02197 2.22894C5.34425 2.06219 5.67972 1.92294 6.025 1.81259V1.47291C6.025 0.66075 6.68575 0 7.49794 0H8.50209C9.31425 0 9.975 0.66075 9.975 1.47291V1.81263C10.3203 1.92294 10.6558 2.06219 10.978 2.22897L11.2188 1.98822C11.8019 1.40441 12.7359 1.42153 13.3021 1.98844L14.0118 2.69812C14.5789 3.26466 14.5953 4.19838 14.0116 4.78141L13.771 5.02197C13.9378 5.34425 14.077 5.67966 14.1874 6.025H14.5271C15.3392 6.025 16 6.68575 16 7.49791V8.50209C16 9.31425 15.3392 9.975 14.5271 9.975H14.1874C14.077 10.3203 13.9378 10.6558 13.771 10.978L14.0118 11.2188C14.5951 11.8015 14.579 12.7353 14.0116 13.3021L13.3018 14.0118C12.7343 14.5801 11.8005 14.5943 11.2186 14.0116L10.978 13.7711C10.6558 13.9378 10.3203 14.0771 9.975 14.1874V14.5272C9.975 15.3392 9.31425 16 8.50206 16ZM5.17866 12.7866C5.62637 13.0513 6.10825 13.2514 6.61088 13.3811C6.81787 13.4345 6.9625 13.6212 6.9625 13.835V14.5271C6.9625 14.8223 7.20272 15.0625 7.49794 15.0625H8.50209C8.79731 15.0625 9.03753 14.8223 9.03753 14.5271V13.835C9.03753 13.6212 9.18216 13.4345 9.38916 13.3811C9.89178 13.2514 10.3737 13.0513 10.8214 12.7866C11.0056 12.6776 11.2401 12.7073 11.3915 12.8586L11.8817 13.3489C12.0931 13.5605 12.4325 13.5556 12.6387 13.3491L13.3489 12.6389C13.5546 12.4335 13.5615 12.094 13.3491 11.8819L12.8587 11.3914C12.7073 11.2401 12.6777 11.0055 12.7866 10.8213C13.0514 10.3737 13.2514 9.89178 13.3811 9.38912C13.4346 9.18213 13.6213 9.03753 13.835 9.03753H14.5271C14.8223 9.03753 15.0625 8.79734 15.0625 8.50212V7.49794C15.0625 7.20272 14.8223 6.96253 14.5271 6.96253H13.835C13.6212 6.96253 13.4346 6.81791 13.3811 6.61094C13.2514 6.10828 13.0514 5.62641 12.7866 5.17872C12.6777 4.99453 12.7073 4.75997 12.8587 4.60866L13.3489 4.11837C13.5609 3.90669 13.5553 3.56731 13.3491 3.36134L12.639 2.65119C12.4331 2.44506 12.0936 2.43903 11.8819 2.651L11.3915 3.14147C11.2402 3.29281 11.0056 3.32244 10.8214 3.2135C10.3737 2.94872 9.89181 2.74869 9.38919 2.61897C9.18219 2.56556 9.03756 2.37888 9.03756 2.16509V1.47291C9.03756 1.17769 8.79734 0.9375 8.50212 0.9375H7.49797C7.20275 0.9375 6.96253 1.17769 6.96253 1.47291V2.16503C6.96253 2.37881 6.81791 2.5655 6.61091 2.61891C6.10828 2.74863 5.62641 2.94866 5.17869 3.21344C4.99444 3.32234 4.75991 3.29272 4.60859 3.14141L4.11834 2.65112C3.90697 2.4395 3.5675 2.44441 3.36134 2.65091L2.65112 3.36109C2.44544 3.56653 2.43856 3.906 2.65094 4.11812L3.14141 4.60859C3.29272 4.75991 3.32234 4.99447 3.21344 5.17866C2.94866 5.62634 2.74866 6.10822 2.61894 6.61088C2.5655 6.81787 2.37881 6.96247 2.16506 6.96247H1.47294C1.17772 6.9625 0.9375 7.20269 0.9375 7.49791V8.50209C0.9375 8.79731 1.17772 9.0375 1.47294 9.0375H2.16503C2.37881 9.0375 2.56547 9.18213 2.61891 9.38909C2.74863 9.89175 2.94866 10.3736 3.21341 10.8213C3.32231 11.0055 3.29269 11.2401 3.14138 11.3914L2.65109 11.8817C2.43916 12.0933 2.44469 12.4327 2.65091 12.6387L3.36106 13.3488C3.56691 13.555 3.90641 13.561 4.11809 13.349L4.60853 12.8586C4.72003 12.7471 4.952 12.6525 5.17866 12.7866Z"
						fill="#D6D6D6"
					/>
					<path
						d="M7.9998 11.4811C6.08021 11.4811 4.51855 9.91937 4.51855 7.9998C4.51855 6.08024 6.08021 4.51855 7.9998 4.51855C9.9194 4.51855 11.4811 6.08024 11.4811 7.9998C11.4811 9.91937 9.9194 11.4811 7.9998 11.4811ZM7.9998 5.45605C6.59715 5.45605 5.45605 6.59718 5.45605 7.9998C5.45605 9.40243 6.59718 10.5436 7.9998 10.5436C9.40243 10.5436 10.5436 9.40243 10.5436 7.9998C10.5436 6.59718 9.40246 5.45605 7.9998 5.45605Z"
						fill="#D6D6D6"
					/>
				</g>
				<defs>
					<clipPath id="clip0_119_92">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</span>
	);
};

export default ServiceIcon;
