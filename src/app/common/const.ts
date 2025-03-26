export const REGEX_IDENTIFICATION = /^[a-zA-Z0-9-]{1,20}$/i;
export const CI = 'cedula';
export const PASSPORT = 'pasaporte';
export const CONSTANTS = {
    register: {
        personalInformation: {
            identificationType: {
                label: 'Tipo de identificacion',
                default: 'Seleccione tipo de documento',
                required: 'Tipo de identificacion es requerido',
            },
            identification: {
                label: 'Identificacion',
                required: 'Identificacion es requerido',
                invalidIdentification: 'La cedula ingresada no es valida',
                invalidDocument: 'La identificacion ingresada no es valida',
                minlength: 'La identificacion debe tener 6 caracteres',
                maxlength: 'Maximo puede tener 20 caracteres',
            },
            lastName: {
                label: 'Apellidos',
                required: 'Apellidos es requerido',
                maxlength: 'Maximo puede tener 100 caracteres',
            },
            name: {
                label: 'Nombres',
                required: 'Nombres es requerido',
                maxlength: 'Maximo puede tener 100 caracteres',
            },
            birthday: {
                label: 'Fecha de nacimiento',
                required: 'Fecha de nacimiento es requerido',
                invalidDate: 'Fecha de nacimiento no puede ser mayor al dia actual',
            },
            gender: {
                label: 'Genero',
                default: 'Seleccione Genero',
                required: 'Genero es requerido',
            },
            maritalStatus: {
                label: 'Estado Civil',
                default: 'Seleccione Estado Civil',
                required: 'Estado Civil es requerido',
            },
            ethnicity: {
                label: 'Etnia',
                default: 'Seleccione etnia',
                required: 'Etnia es requerido',
            },
            disability: {
                label: 'Discapacidad'
            },
            disabilityType: {
                label: 'Tipo de Discapacidad',
                default: 'Seleccione tipo de discapacidad',
                required: 'Tipo de discapacidad es requerido',
            },
            disabilityPercent: {
                label: 'Porcentaje de Discapacidad',
                required: 'Porcentaje de discapacidad es requerido',
                min: 'El porcentaje de discapacidad no debe ser menor a 0',
                max: 'El porcentaje de discapacidad no debe ser mayor a 100',
                pattern: 'El porcentaje de discapacidad solo puede tener numeros',
            },
            nacionality: {
                label: 'Nacionalidad',
                default: 'Seleccione nacionalidad',
                required: 'Nacionalidad es requerido',
            },
            emailAddress: {
                label: 'Correo Electronico Principal',
                required: 'Correo Electronico Principal es requerido',
                maxlength: 'El correo electronico principal permite maximo 100 caracteres',
                pattern: 'El Correo Electronico Principal ingresado no es valido',
            },
            confirmEmailAddress: {
                label: 'Confirmar Correo Electronico',
                required: 'Confirmar Correo Electronico es requerido',
                emailAddressMismatch: 'No coincide con el correo electronico principal',
            },
            secondEmailAddress: {
                label: 'Correo Electronico Alternativo',
                pattern: 'El Correo Electronico Principal ingresado no es valido',
                repeatedEmailAddress: 'El correo electronico secundario no puede ser igual al principal',
            },
            phoneNumber: {
                label: 'Telefono Convencional',
                required: 'Telefono Convencional requerido',
                minlength: 'Telefono Convencional debe tener 7 caracteres minimo',
                maxlength: 'Telefono Convencional debe tener 9 caracteres maximo',
                pattern: 'Telefono Convencional solo puede tener numeros',
            },
            cellPhone: {
                label: 'Celular #1',
                required: 'Celular #1 es requerido',
                minlength: 'Celular #1 debe tener 10 caracteres',
                maxlength: 'Celular #1 debe tener 10 caracteres',
                pattern: 'Celular #1 solo puede tener numeros',
            },
            secondCellPhone: {
                label: 'Celular #2',
                minlength: 'Celular #2 debe tener 10 caracteres',
                maxlength: 'Celular #2 debe tener 10 caracteres',
                pattern: 'Celular #2 solo puede tener numeros',
                cellPhoneMatch: 'Celular #2 no debe ser igual a Celular #1',
            }
        },
        passwordSecurity: {

        },
        placeBirth: {

        },
        placeResidence: {

        }
    }
}