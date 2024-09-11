import React from 'react';

const FilterForm = ({ searchName, handleSearchChange }) => {
	return (
		<div>
			<label>
				filter:
				<input
					type="text"
					value={searchName}
					onChange={handleSearchChange}
					placeholder=""
				/>
			</label>
		</div>
	);
};

export default FilterForm;