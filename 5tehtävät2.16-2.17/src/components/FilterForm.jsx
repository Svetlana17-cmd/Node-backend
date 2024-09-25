const FilterForm = ({ searchName, handleSearchChange }) => {

	return (
		<div>
			<label style={{ color: 'black', fontSize: 20 }}>
				filter:
				<input
					type="text"
					value={searchName}
					onChange={handleSearchChange}
					placeholder=""
				/>
			</label>
		</div >
	);
};

export default FilterForm;