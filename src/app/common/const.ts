export const REGEX_IDENTIFICATION = /^[a-zA-Z0-9-]{1,20}$/i;
export const CI = 'CI';
export const PASSPORT = 'pasaporte';
export const CONSTANTS = {
    register: {
        alertMessage: '* Debes completar correctamente los campos mandatorios del formulario para continuar.',
        alert: '* Si presenta inconvenientes al registrar sus datos puede dirigir un correo electrónico a: soportebecas@senescyt.gob.ec; favor detallar nombres y apellidos completos, número de identificación y su requerimiento.',
        alertMessageTitle: 'Atención!',
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
                label: 'Tipo de identificación',
                default: 'Seleccione tipo de documento',
                required: 'Tipo de identificación es requerido',
            },
            identification: {
                label: 'Identificación',
                required: 'Identificación es requerido',
                invalidIdentification: 'La cédula ingresada no es válida',
                invalidDocument: 'La identificación ingresada no es válida',
                minlength: 'La identificación debe tener 6 caracteres',
                maxlength: 'Máximo puede tener 20 caracteres',
                duplicatedDocument: 'La identificación ingresada ya se encuentra registada',
            },
            lastName: {
                label: 'Apellidos',
                required: 'Apellidos es requerido',
                maxlength: 'Máximo puede tener 100 caracteres',
                invalidFullname: 'Los apellidos o nombres no coinciden con el registro civil',
            },
            name: {
                label: 'Nombres',
                required: 'Nombres es requerido',
                maxlength: 'Máximo puede tener 100 caracteres',
                invalidFullname: 'Los apellidos o nombres no coinciden con el registro civil',
            },
            birthday: {
                label: 'Fecha de nacimiento',
                required: 'Fecha de nacimiento es requerido',
                invalidDate: 'Fecha de nacimiento no puede ser mayor al día actual',
            },
            gender: {
                label: 'Género',
                default: 'Seleccione Género',
                required: 'Género es requerido',
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
                label: 'Discapacidad',
                wsNotAvailable: 'Al momento el servicio de consulta de información de Discapacidad proporcionada por el Ministerio de Salud Pública no se encuentra disponible. Usted puede continuar con el registro sin la información de Discapacidad, caso contrario intente con el registro más tarde.',
                title: 'Consulta de discapacidad'
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
                pattern: 'El porcentaje de discapacidad solo puede tener números',
            },
            nacionality: {
                label: 'Nacionalidad',
                default: 'Seleccione nacionalidad',
                required: 'Nacionalidad es requerido',
            },
            emailAddress: {
                label: 'Correo Electrónico Principal',
                required: 'Correo Electrónico Principal es requerido',
                maxlength: 'El correo Electrónico principal permite máximo 100 caracteres',
                pattern: 'El Correo Electrónico Principal ingresado no es valido',
                duplicatedEmail: 'El correo electrónico ya está registrado.',
            },
            confirmEmailAddress: {
                label: 'Confirmar Correo Electrónico',
                required: 'Confirmar Correo Electrónico es requerido',
                emailAddressMismatch: 'No coincide con el correo electrónico principal',
            },
            secondEmailAddress: {
                label: 'Correo Electrónico Alternativo',
                pattern: 'El Correo Electrónico Principal ingresado no es valido',
                repeatedEmailAddress: 'El correo electrónico secundario no puede ser igual al principal',
            },
            phoneNumber: {
                label: 'Teléfono Convencional',
                required: 'Teléfono Convencional requerido',
                minlength: 'Teléfono Convencional debe tener 9 caracteres',
                maxlength: 'Teléfono Convencional debe tener 9 caracteres',
                pattern: 'Teléfono Convencional no es correcto',
            },
            cellPhone: {
                label: 'Celular #1',
                required: 'Celular #1 es requerido',
                minlength: 'Celular #1 debe tener 10 caracteres',
                maxlength: 'Celular #1 debe tener 10 caracteres',
                pattern: 'Celular #1 no es correcto',
            },
            secondCellPhone: {
                label: 'Celular #2',
                minlength: 'Celular #2 debe tener 10 caracteres',
                maxlength: 'Celular #2 debe tener 10 caracteres',
                pattern: 'Celular #2 es correcto',
                cellPhoneMatch: 'Celular #2 no debe ser igual a Celular #1',
            },
            country: {
                label: 'País',
                default: 'Seleccione País',
                required: 'País es requerido',
            },
            province: {
                label: 'Estado / Provincia',
                default: 'Seleccione Estado / Provincia',
                required: 'Estado / Provincia es requerido',
            },
            city: {
                label: 'Cantón / Ciudad',
                default: 'Seleccione Cantón / Ciudad',
                required: 'Cantón / Ciudad es requerido',
            },
            parish: {
                label: 'Parroquia',
                default: 'Seleccione parroquia',
                required: 'Parroquia es requerido',
            },
        },
        passwordSecurity: {
            password: {
                label: 'Contraseña',
                required: 'Contraseña es requerido',
                pattern: 'La contraseña debe contener al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial que puede ser @ $ # %',
                minlength: 'La contraseña debe tener al menos 6 caracteres',
                maxlength: 'La contraseña debe tener máximo 20 caracteres',
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
                maxlength: 'Respuesta #1 debe tener máximo 20 caracteres',
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
                maxlength: 'Respuesta #2 debe tener máximo 20 caracteres',
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
                maxlength: 'Respuesta #3 debe tener máximo 20 caracteres',
            },
        },
        placeBirth: {
            country: {
                label: 'País',
                default: 'Seleccione País',
                required: 'País es requerido',
            },
            province: {
                label: 'Estado / Provincia',
                default: 'Seleccione Estado / Provincia',
                required: 'Estado / Provincia es requerido',
            },
            city: {
                label: 'Cantón / Ciudad',
                default: 'Seleccione Cantón / Ciudad',
                required: 'Cantón / Ciudad es requerido',
            },
            parish: {
                label: 'Parroquia',
                default: 'Seleccione parroquia',
                required: 'Parroquia es requerido',
            },
        },
        placeResidence: {
            country: {
                label: 'País',
                default: 'Seleccione País',
                required: 'País es requerido',
            },
            province: {
                label: 'Estado / Provincia',
                default: 'Seleccione Estado / Provincia',
                required: 'Estado / Provincia es requerido',
            },
            city: {
                label: 'Cantón / Ciudad',
                default: 'Seleccione Cantón / Ciudad',
                required: 'Cantón / Ciudad es requerido',
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
                maxlength: 'Sector debe tener máximo 50 caracteres'
            },
            street: {
                label: 'Calle Principal',
                required: 'Calle Principal es requerido',
                maxlength: 'Calle Principal debe tener máximo 50 caracteres'
            },
            secondaryStreet: {
                label: 'Calle Secundaria',
                required: 'Calle Secundaria es requerido',
                maxlength: 'Calle Secundaria debe tener máximo 50 caracteres'
            },
            number: {
                label: 'Número',
                required: 'Número es requerido',
                maxlength: 'Número debe tener máximo 20 caracteres'
            },
            geographicReference: {
                label: 'Referencia Geográfica',
                required: 'Referencia Geográfica es requerido',
                maxlength: 'Referencia Geográfica debe tener máximo 200 caracteres'
            },
            postalCode: {
                label: 'Código postal',
                required: 'Código postal es requerido',
                maxlength: 'Código postal debe tener máximo 20 caracteres'
            },
        }
    }
}
