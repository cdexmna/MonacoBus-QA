import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
const fs = require("fs");
// import TransportsCP from '../../screenObjects/CP/Transports.screen.js';

const LoginScreenCP = require('../../../screenObjects/CP/login.screen.js');
const LoginScreenDI = require('../../../screenObjects/English/DI/login.screen.js');
const NavigationCP = require('../../../screenObjects/CP/navigation.wrapper.js');
const TransportsCP = require('../../../screenObjects/CP/Transports.screen.js');
const TicketCategoriesCP = require('../../../screenObjects/CP/TicketCategories.screen.js');
const UsersCP = require('../../../screenObjects/CP/Users.screen.js');
const HomeScreenDI = require('../../../screenObjects/English/DI/home.screen.js');

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(60000);
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + "-CP.json"));
const strings = languageFile.screens.home;

/* *********************
replaced all btnLogin.click() to bounding box script because the button can't be found by it's default locator
    await loginScreenDI.btnLogin.click();
*************************



*/

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://qa.staging.cp.grandtourapp.com/' 

test.describe('Users page', (page) => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL);
    });
    test.describe('Users page', (page) => {
        test.beforeEach(async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page, lang);
            const navigationCP = new NavigationCP(page, lang);
            await loginScreenCP.inputUsername.fill(testUserCS.email);
            await loginScreenCP.inputPassword.fill(testUserCS.password);
            await loginScreenCP.inputUsername.click();
            await loginScreenCP.btnLogin.click();
            await page.waitForSelector('text=Dashboard');
            await navigationCP.linkUsers.click();
        });
         // test.afterEach(async ({ page}) => {
    //     const navigationCP = new NavigationCP(page);
    //     const loginScreenCP = new LoginScreenCP(page)
    //     await navigationCP.hiUser.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    // })
        test('should show all UI elements', async ({ page }) => {
            const usersCP = new UsersCP(page, lang);
            const id30char = uuidv4();
            await page.waitForSelector('text=New User');
            await expect(usersCP.btnNewUser).toBeVisible();
            await usersCP.btnNewUser.click();
            await expect(usersCP.textCreateANewUser).toBeVisible();
            await expect(usersCP.btnBack).toBeVisible();
            await expect(usersCP.textEnrollANewUser).toBeVisible();
            await expect(usersCP.inputUserName).toBeVisible();
            await expect(usersCP.inputFirstName).toBeVisible();
            await expect(usersCP.inputLastName).toBeVisible();
            await expect(usersCP.inputEmail).toBeVisible();
            await expect(usersCP.btnSubmit).toBeVisible();
        });
        test.describe('New User', (page) => {
            test('submit button is disabled if mandatory inputs arent filled', async ({ page }) => {
                const usersCP = new UsersCP(page, lang);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await expect(usersCP.btnSubmit).toBeDisabled();
            });

            test('submit button enables if mandatory inputs are filled', async ({ page }) => {
                const usersCP = new UsersCP(page, lang);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill(username);
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill('email@email.com');
                await expect(usersCP.btnSubmit).toBeEnabled();
            });

            test('should test all fields for required', async ({ page }) => {
                const usersCP = new UsersCP(page, lang);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputFirstName.fill('123');
                await usersCP.inputLastName.click();
                await usersCP.inputFirstName.fill('');
            await usersCP.inputLastName.click();
                // await usersCP.btnSubmit.click();
                await expect(usersCP.errorLabelUsernameRequired).toBeVisible({timeout:10000});
                // await expect(usersCP.errorLabelFirstNameRequired).toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelLastNameRequired).toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelEmailRequired).toBeVisible({timeout:10000});
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill(username);
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill(username + '@email.com');
                await expect(usersCP.errorLabelUsernameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelFirstNameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelLastNameRequired).not.toBeVisible({timeout:10000});
                await expect(usersCP.errorLabelEmailRequired).not.toBeVisible({timeout:10000});
            });
            test.describe('Username', (page) => {
                test.skip('username field uniqueness constraint', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    const id30char = uuidv4();
                    const username = id30char.substring(0, 20);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill('alreadyExist');
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill(username + '@email.com');
                    await usersCP.btnSubmit.click();
                    await expect.soft(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                    await expect.soft(usersCP.errorLabelUsernameAlreadyExist).toBeVisible();
                });
                test.skip('shouldnt create a username containing anything but letters, numbers and @/./+/-/_ symbols', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    const id30char = uuidv4();
                    const username = id30char.substring(0, 20);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill('!#$%^&*()');
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill(username + '@mail.com');
                    await usersCP.btnSubmit.click();
                    await expect(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                    await expect(usersCP.errorLabelUsernameInvalid).toBeVisible();
                });
            });
            test.describe('Email', (page) => {
                test('email field uniqueness constraint', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    const id30char = uuidv4();
                    const username = id30char.substring(0, 20);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill(username);
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill('alreadyExist@email.com');
                    await usersCP.btnSubmit.click();
                    await expect(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                    await expect(usersCP.errorLabelEmailAlreadyExist).toBeVisible();
                });
                test('email field invalid email', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    const id30char = uuidv4();
                    const username = id30char.substring(0, 20);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill(username);
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill('invalidEmail');
                    await usersCP.btnSubmit.click();
                    await expect(usersCP.overlayCreateError).toBeVisible({timeout: 10000});
                    await expect(usersCP.errorLabelEmailInvalid).toBeVisible();
                });
            });
            test.describe('Function', (page) => {
                test('should create a new user', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    const id30char = uuidv4();
                    const username = id30char.substring(0, 20)+'username';
                    const email = id30char.substring(0, 20)+'@email.com';
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill(username);
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill(email);
                    await usersCP.btnSubmit.click();
                    await expect(usersCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                    await page.waitForSelector('text=New User');
                    await expect(page.getByText(email)).toBeVisible();
                });
            });
            test.fixme('should be to create a new user and login the Drivers Interface with those credentials', async ({ page }) => {
                const loginScreenCP = new LoginScreenCP(page);
                const usersCP = new UsersCP(page, lang);
                const id30char = uuidv4();
                const username = id30char.substring(0, 20);
                
                await page.waitForSelector('text=New User');
                await usersCP.btnNewUser.click();
                await page.waitForSelector('text=Create a new User');
                await usersCP.inputUserName.fill(username);
                await usersCP.inputFirstName.fill('Test');
                await usersCP.inputLastName.fill('User');
                await usersCP.inputEmail.fill('testEmail@email.com');
                await usersCP.btnSubmit.click();
                await expect(usersCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                await page.waitForSelector('text=New User');
                await expect(page.locator(`table :text-is("${username}")`)).toBeVisible();
                await page.goto('https://seashell-app-pkyfy.ondigitalocean.app/');
                await loginScreenCP.inputUsername.fill(username);
                await loginScreenCP.inputPassword.fill('password');
                await loginScreenCP.btnLogin.click();
                await page.waitForSelector('text=Select Your Vehicle');
            });
        });
        test.describe('Edit User', (page) => {
            const id30char = uuidv4();
            const username = id30char.substring(0, 20)+'username';
            // test.beforeEach(async ({ page }) => {
            //     const usersCP = new UsersCP(page, lang);
            //     await page.waitForSelector('text=New User');
            //     await usersCP.btnNewUser.click();
            //     await page.waitForSelector('text=Create a new User');
            //     await usersCP.inputUserName.fill(username);
            //     await usersCP.inputFirstName.fill('Test');
            //     await usersCP.inputLastName.fill('User');
            //     await usersCP.inputEmail.fill(username+'@email.com');
            //     await usersCP.btnSubmit.click();
            //     await page.waitForSelector('text=New User');
            // });
            // test.afterEach(async ({ page }) => {
            //     const usersCP = new UsersCP(page, lang);
            //     await page.waitForSelector('text=New User');
            //     await page.getByText(username).first().click();
            //     await page.waitForSelector('text=Edit User');
            //     await usersCP.editUserDeleteUser.click();
            //     await page.waitForSelector('text=Are you sure?');
            //     await usersCP.overlayDeleteUser.click();
            //     await page.waitForSelector('text=New User');
            //     await expect(page.locator(`table :text-is("${username}")`)).not.toBeVisible();
            // });
            test('tapping the email should open the edit user wrapper', async ({ page }) => {
                const usersCP = new UsersCP(page, lang);
                await page.waitForSelector('text=New User');
                await page.getByText('forEdit@email.com').first().click();
                await page.waitForSelector('text=Edit User');
                await expect.soft(usersCP.editUserHeading).toBeVisible();
                await expect.soft(usersCP.editUserUsername).toBeVisible();
                await expect.soft(usersCP.editUserFirstName).toBeVisible();
                await expect.soft(usersCP.editUserLastName).toBeVisible();
                await expect.soft(usersCP.editUserEmail).toBeVisible();
                await expect.soft(usersCP.editUserUpdateUser).toBeVisible();
                // await expect.soft(usersCP.editUserDeleteUserHeading).toBeVisible();
                // await expect(usersCP.editUserDeleteUser).toBeVisible();
            });

            test('editing a user already has all prefilled values', async ({page}) => {
                const usersCP = new UsersCP(page, lang);
                await page.waitForSelector('text=New User');
                await page.getByText('forEdit@email.com').first().click();
                await page.waitForSelector('text=Edit User');
                await expect.soft(usersCP.editUserUsername).toHaveValue('username');
                await expect.soft(usersCP.editUserFirstName).toHaveValue('Test');
                await expect.soft(usersCP.editUserLastName).toHaveValue('User');
                await expect.soft(usersCP.editUserEmail).toHaveValue('forEdit@email.com');
            });

            test.skip('username field uniqueness constraint', async ({ page }) => {
                const usersCP = new UsersCP(page, lang);
                await page.waitForSelector('text=New User');
                await page.getByText(username).first().click();
                await page.waitForSelector('text=Edit User');
                await usersCP.editUserUsername.fill('alreadyExist');
                await usersCP.editUserUpdateUser.click();
                await expect.soft(usersCP.errorLabelUsernameAlreadyExist).toBeVisible();
                await expect(usersCP.overlayUpdateError).toBeVisible({timeout: 10000});
            });
            test.describe('Function', (page) => {
                test('should update the user - all fields', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await page.getByText('forEdit@email.com').first().click();
                    await page.waitForSelector('text=Edit User');
                    await usersCP.editUserUsername.fill(username + ' Edited');
                    await usersCP.editUserFirstName.fill('Test Edited');
                    await usersCP.editUserLastName.fill('User Edited');
                    await usersCP.editUserEmail.fill(username + '@email.com');
                    await usersCP.editUserUpdateUser.click();
                    await page.waitForSelector('text=New User');
                    await expect(usersCP.overlayUpdatedSuccessfully).toBeVisible();
                    await expect(page.getByText(username+'@email.com' + 'Test EditedUser Edited')).toBeVisible();
                    await page.waitForTimeout(3000);
                    const editedLocator = page.getByText(username+'@email.com')
                    await editedLocator.click();

                    await usersCP.editUserUsername.fill('username');
                    await usersCP.editUserFirstName.fill('Test');
                    await usersCP.editUserLastName.fill('User');
                    await usersCP.editUserEmail.fill('forEdit@email.com');

                    await usersCP.editUserUpdateUser.click();
                    await expect(page.getByText('forEdit@email.comTestUser')).toBeVisible();
                });
            });
        });
        test.describe.skip('Delete User', (page) => {
            test.describe('check for UI elements', (page) => {
                const id30char = uuidv4();
                const username = id30char.substring(0, 20)+'username';
                test.beforeEach(async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill(username);
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill(username+'@email.com');
                    await usersCP.btnSubmit.click();
                    await page.waitForSelector('text=New User');
                });
                test.afterEach(async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await page.getByText(username).first().click();
                    await page.waitForSelector('text=Edit User');
                    await usersCP.editUserDeleteUser.click();
                    await page.waitForSelector('text=Are you sure?');
                    await usersCP.overlayDeleteUser.click();
                    await page.waitForSelector('text=New User');
                    await expect(page.locator(`table :text-is("${username}")`)).not.toBeVisible();
                });
                test('check all elements for delete user', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await page.getByText(username).first().click();
                    await page.waitForSelector('text=Edit User');
                    await page.waitForSelector('text=Edit User');
                    await expect(usersCP.editUserDeleteUserHeading).toBeVisible();
                    await expect(usersCP.editUserDeleteUser).toBeVisible();
                });
                test('check for alert messages on delete user', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await page.getByText(username).first().click();
                    await page.waitForSelector('text=Edit User');
                    await usersCP.editUserDeleteUser.click();
                    await page.waitForSelector('text=Are you sure?');
                    await expect(usersCP.editUserDeleteUserAlertTitle).toBeVisible();
                    await expect(usersCP.editUserDeleteUserAlertMessage).toBeVisible();
                    await expect(usersCP.editUserDeleteUserGoBack).toBeVisible();
                    await usersCP.editUserDeleteUserGoBack.click();
                });
                test('should go back to edit user', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await page.getByText(username).first().click();
                    await page.waitForSelector('text=Edit User');
                    await usersCP.editUserDeleteUser.click();
                    await usersCP.editUserDeleteUserGoBack.click();
                    await page.waitForSelector('text=Edit User');
                    await expect(usersCP.editUserDeleteUserAlertMessage).not.toBeVisible();
                });
            });
            test.describe('Function', (page) => {
                const id30char = uuidv4();
                const username = id30char.substring(0, 20)+'username';
                test('should delete the user', async ({ page }) => {
                    const usersCP = new UsersCP(page, lang);
                    await page.waitForSelector('text=New User');
                    await usersCP.btnNewUser.click();
                    await page.waitForSelector('text=Create a new User');
                    await usersCP.inputUserName.fill(username);
                    await usersCP.inputFirstName.fill('Test');
                    await usersCP.inputLastName.fill('User');
                    await usersCP.inputEmail.fill(username+'@email.com');
                    await usersCP.btnSubmit.click();
                    
                    await page.waitForSelector('text=New User');
                    await page.getByText(username).first().click();
                    await page.waitForSelector('text=Edit User');
                    await usersCP.editUserDeleteUser.click();
                    await page.waitForSelector('text=Are you sure?');
                    await usersCP.overlayDeleteUser.click();
                    await page.waitForSelector('text=New User');
                    await expect(usersCP.overlayDeletedSuccessfully).toBeVisible();
                    await expect(page.locator(`table :text-is("${username}")`)).not.toBeVisible();
                });
            });
        });
    });
});