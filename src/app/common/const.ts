export const REGEX_IDENTIFICATION = /^[a-zA-Z0-9-]{1,20}$/i;
export const CI = 'cedula';
export const PASSPORT = 'pasaporte';
export const CONSTANTS = {
    register: {
        alertMessage: '* Debes completar correctamente los campos mandatorios el formulario para continuar.',
        alertMessageTitle: 'Atencion!',
        back: 'Atras',
        next: 'Siguiente',
        save: 'Guardar',
        title: 'Registro de usuario',
        generalDataTitle: 'Datos Generales',
        passwordSecurityTitle: 'Contraseña y seguridad',
        placeBirthTitle: 'Lugar de nacimiento',
        placeResidenceTitle: 'Lugar de residencia',
        finalTitle: 'Final',
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
            password: {
                label: 'Contraseña',
                required: 'Contraseña es requerido',
                pattern: 'La contraseña debe contener al menos 1 mayuscula, 1 minuscula, 1 numero y un caracter especial que puede ser @ $ # %',
                minlength: 'La contraseña debe tener al menos 6 caracteres',
                maxlength: 'La contraseña debe tener maximo 20 caracteres',
            },
            confirmPassword: {
                label: 'Confirmar Contraseña',
                required: 'Confirmar Contraseña es requerido',
                passwordMismatch: 'Las contraseñas no coinciden'
            },
            securityQuestionOne: {
                label: 'Pregunta de Seguridad #1',
                default: 'Seleccione Pregunta de Seguridad',
                required: 'Pregunta de Seguridad #1 es requerido',
                fieldsNotDistinct: 'No se pueden repetir las preguntas',
            },
            securityAnswerOne: {
                label: 'Respuesta #1',
                required: 'Respuesta #1 es requerido',
                maxlength: 'Respuesta #1 debe tener maximo 20 caracteres',
            },
            securityQuestionTwo: {
                label: 'Pregunta de Seguridad #2',
                default: 'Seleccione Pregunta de Seguridad',
                required: 'Pregunta de Seguridad #2 es requerido',
                fieldsNotDistinct: 'No se pueden repetir las preguntas',
            },
            securityAnswerTwo: {
                label: 'Respuesta #2',
                required: 'Respuesta #2 es requerido',
                maxlength: 'Respuesta #2 debe tener maximo 20 caracteres',
            },
            securityQuestionThree: {
                label: 'Pregunta de Seguridad #3',
                default: 'Seleccione Pregunta de Seguridad',
                required: 'Pregunta de Seguridad #3 es requerido',
                fieldsNotDistinct: 'No se pueden repetir las preguntas',
            },
            securityAnswerThree: {
                label: 'Respuesta #3',
                required: 'Respuesta #3 es requerido',
                maxlength: 'Respuesta #3 debe tener maximo 20 caracteres',
            },
        },
        placeBirth: {
            country: {
                label: 'Pais',
                default: 'Seleccione pais',
                required: 'Pais es requerido',
            },
            province: {
                label: 'Estado / Provincia',
                default: 'Seleccione Estado / Provincia',
                required: 'Estado / Provincia es requerido',
            },
            city: {
                label: 'Canton / Ciudad',
                default: 'Seleccione Canton / Ciudad',
                required: 'Canton / Ciudad es requerido',
            },
            parish: {
                label: 'Parroquia',
                default: 'Seleccione parroquia',
                required: 'Parroquia es requerido',
            },
        },
        placeResidence: {
            country: {
                label: 'Pais',
                default: 'Seleccione pais',
                required: 'Pais es requerido',
            },
            province: {
                label: 'Estado / Provincia',
                default: 'Seleccione Estado / Provincia',
                required: 'Estado / Provincia es requerido',
            },
            city: {
                label: 'Canton / Ciudad',
                default: 'Seleccione Canton / Ciudad',
                required: 'Canton / Ciudad es requerido',
            },
            parish: {
                label: 'Parroquia',
                default: 'Seleccione parroquia',
                required: 'Parroquia es requerido',
            },
            zone: {
                label: 'Zona',
                default: 'Seleccione zona',
                required: 'Zona es requerido',
            },
            sector: {
                label: 'Sector',
                required: 'Sector es requerido',
                maxlength: 'Sector debe tener maximo 50 caracteres'
            },
            street: {
                label: 'Calle Principal',
                required: 'Calle Principal es requerido',
                maxlength: 'Calle Principal debe tener maximo 50 caracteres'
            },
            secondaryStreet: {
                label: 'Calle Secundaria',
                required: 'Calle Secundaria es requerido',
                maxlength: 'Calle Secundaria debe tener maximo 50 caracteres'
            },
            number: {
                label: 'Numero',
                required: 'Numero es requerido',
                maxlength: 'Numero debe tener maximo 20 caracteres'
            },
            geographicReference: {
                label: 'Referencia Geografica',
                required: 'Referencia Geografica es requerido',
                maxlength: 'Referencia Geografica debe tener maximo 200 caracteres'
            },
            postalCode: {
                label: 'Codigo postal',
                required: 'Codigo postal es requerido',
                maxlength: 'Codigo postal debe tener maximo 20 caracteres'
            },
        }
    }
}