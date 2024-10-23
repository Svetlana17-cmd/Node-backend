import React from 'react';
import styles from './AddPersonForm.module.css';

const AddPersonForm = ({ addPerson, newName, phone, handleNameChange, handleNumberChange }) => {


	return (
		<div>
			<form onSubmit={addPerson} className={styles.form}>
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
					<button type='submit' className={styles.btn} onClick={e => AddPersonForm(e)} >
						add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddPersonForm;

