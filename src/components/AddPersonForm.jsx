
import React from 'react';

const AddPersonForm = ({ addPerson, newName, phone, handleNameChange, handleNumberChange }) => {


	return (
		<div>
			<form onSubmit={addPerson}>
				<label>
					name:
					<input
						type="text"
						value={newName}
						onChange={handleNameChange}
						placeholder=""
					/>
				</label>
				<br />
				<label>
					number:
					<input
						type="text"
						value={phone}
						onChange={handleNumberChange}
						placeholder=""
					/>
				</label>

				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</div>
	);
};

export default AddPersonForm;

