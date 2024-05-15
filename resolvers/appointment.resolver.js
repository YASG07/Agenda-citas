const { appointmentData } = require('../data/appointment.data');

const appointmentResolver = {
    Query: {
        allAppointments: () => {
            return appointmentData
        },
        oneAppointment: (_, { id }) => {
            console.log(id)
            const appointment = appointmentData.find(
                (element) => element.id === id
            );
            return appointment;
        }
    },
    Mutation: {
        addAppointment: (parent, {date, time, treatment, patient, price, address, doctor}) => {
            const newAppointment = {
                id: appointmentData.length + 1,
                date: date,
                time: time,
                treatment: treatment,
                patient: patient,
                price: price,
                address: address,
                doctor: doctor
            };
            appointmentData.push(newAppointment);
            return newAppointment;
        },
        updateAppointment: (parent, {id, date, time, address, doctor}) => {
            const appointment = appointmentData.find(
                (element) => element.id === id
            );
            if(appointment === undefined){
                throw new Error("Appointment not found or scheduled");
            }
            appointment.date = date;
            appointment.time = time;
            appointment.address = address;
            appointment.doctor = doctor;
            return appointment;
        },
        deleteAppointment: (parent, { id }) => {
            const appointmentIndex = appointmentData.findIndex(
                appointment => appointment.id === id
            );
            if(appointmentIndex === -1){
                throw new Error("Appointment not found or scheduled");
            }
            return appointmentData.splice(appointmentIndex, 1)[0];
        }
    }
}

module.exports = {
    appointmentResolver
};
