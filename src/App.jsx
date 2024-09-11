import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import axios from 'axios';


const App = () => {

	const [newName, setNewName] = useState('');
	const [phone, setPhone] = useState('');
	const [searchName, setSearchName] = useState('');
	const [persons, setPersons] = useState([])

	useEffect(() => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])
	console.log('render', persons.length, 'persons')


	const handleSearchChange = (e) => {
		const newName = e.target.value.toLowerCase();
		setSearchName(newName);
	};

	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(searchName)
	);


	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: phone,
			important: Math.random() > 0.5,
			id: String(persons.length + 1),
		}
		console.log('What?')

		const nameExists = persons.some(person => person.name === newName);
		if (nameExists) {
			alert(`${newName} is already added to phonebook `);
		} else {
			setPersons((persons.concat(personObject)));
			setNewName('');
			setPhone('');
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setPhone(event.target.value)
	}



	return (
		<div>
			<h2>Phonebook</h2>
			<FilterForm name={searchName} handleSearchChange={handleSearchChange} />
			<h3>Add a new</h3>
			<AddPersonForm setPhone={setPhone}
				addPerson={addPerson}
				setNewName={setNewName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			{filteredPersons.map(person => (
				<PersonList key={person.id} person={person} />
			))}
		</div>
	);
};

export default App;