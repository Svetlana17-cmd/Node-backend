import React from 'react';

const AddPersonForm = ({ newPerson, phone, handleAddName, setNewPerson, setPhone }) => {
	return (
		<div>
			<div>
				<input
					type="text"
					value={newPerson}
					onChange={(e) => setNewPerson(e.target.value)}
					placeholder=""
				/>
			</div>
			<div>
				<input
					type="text"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder=""
				/>
			</div>
			<div>
				<button type='submit' onClick={handleAddName}>add</button>
			</div>
		</div>
	);
};

export default AddPersonForm;
