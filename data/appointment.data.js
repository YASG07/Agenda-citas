const people = [
	{
		name: "Chuck",
		lastName: "Billy",
		phone: "3111929040",
	},
	{
		name: "Alex",
		lastName: "Skolnick",
		email: "alexsko@test.ament",
	},
	{
		name: "Eric",
		lastName: "Peterson",
		phone: "3111929041",
		email: "ericpet@test.ament",
	},
	
];

const appointmentData = [
	{
		id: "1",
		date: "2024-05-16",
		time: "8:00 AM",
		treatment: "Limpieza",
		patient: people[0],
		price: 5.00,
		address: "Av. Tecnologico #545",
		doctor: "Dr. Israel Arjona Vizcaino"
	},
	{
		id: "2",
		date: "2024-05-16",
		time: "11:00 AM",
		treatment: "Extracción",
		patient: people[2],
		price: 10.00,
		address: "Av. Tecnologico #545",
		doctor: "Dr. Israel Arjona Vizcaino"
	},
];

module.exports = {
	appointmentData
}; 
