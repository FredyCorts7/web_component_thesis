const { isAuthorized } = require('../../../helpers/authorization.helper');

describe('Prueba unitaria en utilidad para determinar la autorización', () => {
  test('CP16 - Debería determinar la concesión de autorización según los roles establecidos', () => {
    const rolesRequired = ['Estudiante'];
    const rolesCurrent1 = ['Nutricionista'];
    const rolesCurrent2 = ['Estudiante'];

    const isAuthorized1 = isAuthorized(rolesRequired, rolesCurrent1);
    const isAuthorized2 = isAuthorized(rolesRequired, rolesCurrent2);

    expect(isAuthorized1).toBeFalsy();
    expect(isAuthorized2).toBeTruthy();
  });
});
