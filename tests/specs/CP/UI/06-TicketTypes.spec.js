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
const TicketTypesCP = require('../../../screenObjects/CP/TicketTypes.screen.js');

const testUserDI = DimiDI;
const testUserCS = DimiCS;
test.setTimeout(60000);
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + "-CP.json"));
const strings = languageFile.screens.ticketTypes;

/* *********************
replaced all btnLogin.click() to bounding box script because the button can't be found by it's default locator
    await loginScreenDI.btnLogin.click();
*************************



*/

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://ticketing-admin-frontend-j6hga.ondigitalocean.app/' 

test.describe('Ticket types', (page) => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL);
    });
    test.describe('Ticket types page', (page) => {
        test.beforeEach(async ({ page }) => {
            const loginScreenCP = new LoginScreenCP(page);
            const navigationCP = new NavigationCP(page);
            await loginScreenCP.inputUsername.fill(testUserCS.username);
            await loginScreenCP.inputPassword.fill(testUserCS.password);
            await loginScreenCP.inputUsername.click();
            await loginScreenCP.btnLogin.click();
            await page.waitForSelector('text=Dashboard');
            await navigationCP.linkTicketTypes.click();
        });
         // test.afterEach(async ({ page}) => {
    //     const navigationCP = new NavigationCP(page);
    //     const loginScreenCP = new LoginScreenCP(page)
    //     await navigationCP.hiAmigo.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    // })
        test('should show all UI elements', async ({ page }) => {
            const ticketTypesCP = new TicketTypesCP(page);
            const id30char = uuidv4();
            await page.waitForSelector('text=New Type');
            await expect(ticketTypesCP.btnNewTicketType).toBeVisible();
            await ticketTypesCP.btnNewTicketType.click();
            await expect(ticketTypesCP.textCreateANewTicketType).toBeVisible();
            await expect(ticketTypesCP.btnBack).toBeVisible();
            await expect(ticketTypesCP.textOfferANewTicketType).toBeVisible();
            await expect(ticketTypesCP.inputName).toBeVisible();
            await expect(ticketTypesCP.inputPrice).toBeVisible();
            await expect(ticketTypesCP.inputPosition).toBeVisible();
            await expect(ticketTypesCP.btnSubmit).toBeVisible();
        });
        test.describe('New Type', () => {
            test('should test all fields for required', async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                await page.waitForSelector('text=New Type');
                await ticketTypesCP.btnNewTicketType.click();
                await ticketTypesCP.btnSubmit.click();
                await expect(ticketTypesCP.errorLabelNameRequired).toBeVisible();
                await expect(ticketTypesCP.errorLabelPriceRequired).toBeVisible();
                await expect(ticketTypesCP.errorLabelIconRequired).toBeVisible();
                await expect(ticketTypesCP.errorLabelVatRateRequired).toBeVisible();
                await expect(ticketTypesCP.errorLabelTicketCategoryRequired).toBeVisible();
            });
            test.describe('Inputs', () => {
                test.describe('Name', () => {
                    test('name field uniqueness constraint', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        // await page.locator('button[name="New Type"]');
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill('alreadyExist');
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('100');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelNameAlreadyExist).toBeVisible();
                    });
                });
                test.describe('Price', () => {
                    test.skip('shouldnt create a ticket type with invalid price', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('invalidPrice');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelPriceInvalid).toBeVisible();
                    });
                    test('shouldnt create a ticket type with negative price', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('-100');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelPriceInvalid).toBeVisible();
                    });
                    test('shouldnt create a ticket type with price higher than 1000000', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('1000001');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelPriceInvalid).toBeVisible();
                    });
                });
                test.describe('Position', () => {
                    test.skip('shouldnt create a ticket type with invalid position', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('invalidPosition');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelPositionInvalid).toBeVisible();
                    });
                    test('shouldnt create a ticket type with negative position', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('-1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.overlayCreateError).toBeVisible({timeout: 10000});
                        await expect(ticketTypesCP.errorLabelPositionInvalid).toBeVisible();
                    });
                });
            });
            test.describe('Selects', () => {
                test.describe('Icon', () => {
                    test('shouldnt create a ticket type without icon', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.errorLabelIconRequired).toBeVisible();
                    });
                });
                test.describe('Vat Rate', () => {
                    test('shouldnt create a ticket type without vat rate', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.errorLabelVatRateRequired).toBeVisible();
                    });
                });
                test.describe('Ticket Category', () => {
                    test('shouldnt create a ticket type without ticket category', async ({ page }) => {
                        const ticketTypesCP = new TicketTypesCP(page);
                        const id30char = uuidv4();
                        const name = id30char.substring(0, 20);
                        await page.waitForSelector('text=New Type');
                        await ticketTypesCP.btnNewTicketType.click();
                        await page.waitForSelector('text=Create a new Ticket Type');
                        await ticketTypesCP.inputName.fill(name);
                        await ticketTypesCP.inputPrice.fill('100');
                        await ticketTypesCP.inputPosition.fill('1');
                        await ticketTypesCP.selectIcon.selectOption('Adult');
                        await ticketTypesCP.selectVat.selectOption('10.00');
                        await ticketTypesCP.btnSubmit.click();
                        await expect(ticketTypesCP.errorLabelTicketCategoryRequired).toBeVisible();
                    });
                });
            });
            test.describe('Function', () => {
                test('should create a new ticket type', async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    const id30char = uuidv4();
                    const name = id30char.substring(0, 20);
                    await page.waitForSelector('text=New Type');
                    await ticketTypesCP.btnNewTicketType.click();
                    await page.waitForSelector('text=Create a new Ticket Type');
                    await ticketTypesCP.inputName.fill(name);
                    await ticketTypesCP.inputPrice.fill('100');
                    await ticketTypesCP.inputPosition.fill('1');
                    await ticketTypesCP.selectIcon.selectOption('Adult');
                    await ticketTypesCP.selectVat.selectOption('10.00');
                    await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                    await ticketTypesCP.btnSubmit.click();
                    await expect(ticketTypesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                    await expect(page.locator('text=' + name)).toBeVisible();
                });
            });
            test.fixme('should be able to create a new ticket type and verify its creation', async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                const id30char = uuidv4();
                const name = id30char.substring(0, 20);
                
                await page.waitForSelector('text=New Type');
                await ticketTypesCP.btnNewTicketType.click();
                await page.waitForSelector('text=Create a new Ticket Type');
                await ticketTypesCP.inputName.fill(name);
                await ticketTypesCP.inputPrice.fill('100');
                await ticketTypesCP.inputPosition.fill('1');
                await ticketTypesCP.btnSubmit.click();
                await expect(ticketTypesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                await page.waitForSelector('text=New Type');
                await expect(page.locator('text=' + name)).toBeVisible();
            });
        });
        test.describe('Edit Ticket Type', () => {
            const id30char = uuidv4();
            let name = id30char.substring(0, 20)+'name';
            test.beforeEach(async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                await page.waitForSelector('text=New Type');
                await ticketTypesCP.btnNewTicketType.click();
                await page.waitForSelector('text=Create a new Ticket Type');
                await ticketTypesCP.inputName.fill(name);
                await ticketTypesCP.inputPrice.fill('100');
                await ticketTypesCP.inputPosition.fill('1');
                await ticketTypesCP.selectIcon.selectOption('Adult');
                await ticketTypesCP.selectVat.selectOption('10.00');
                await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                await ticketTypesCP.btnSubmit.click();
                await expect(ticketTypesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
            });

            test.afterEach(async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                await page.waitForSelector('text=New Type');
                await page.getByText(name).first().click();
                await page.waitForSelector('text=Edit Ticket Type');
                await ticketTypesCP.editTicketTypeDeleteTicketType.click();
                await page.waitForSelector('text=Are you sure?');
                await ticketTypesCP.confirmDeleteTicketType.click();
                await page.waitForSelector('text=New Type');
                await expect(page.locator('table').locator('text=' + name)).not.toBeVisible();
            });
            
            test('tapping the ticket type name should open the edit ticket type wrapper', async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                await page.waitForSelector('text=New Type');
                await page.getByText(name).first().click();
                await page.waitForSelector('text=Edit Ticket Type');
            });
            test('name field uniqueness constraint', async ({ page }) => {
                const ticketTypesCP = new TicketTypesCP(page);
                await page.waitForSelector('text=New Type');
                await page.getByText(name).first().click();
                await page.waitForSelector('text=Edit Ticket Type');
                await ticketTypesCP.inputName.fill('alreadyExist');
                await ticketTypesCP.btnUpdate.click();
                await expect(ticketTypesCP.errorLabelNameAlreadyExist).toBeVisible();
                // await expect(ticketTypesCP.overlayUpdateError).toBeVisible({timeout: 10000});
            });
            test.describe('Function', (page) => {
                test('should update a ticket type - all fields', async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    let name = 'UpdatedName';
                    // const name = 'UpdatedName';
                    const newPrice = '200';
                    const newPosition = '2';
                    await page.waitForSelector('text=New Type');
                    await page.getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await ticketTypesCP.inputName.fill(name);
                    await ticketTypesCP.inputPrice.fill(newPrice);
                    await ticketTypesCP.inputPosition.fill(newPosition);
                    await ticketTypesCP.selectIcon.selectOption('Cash');
                    await ticketTypesCP.selectVat.selectOption('20.00');
                    await ticketTypesCP.selectTicketCategory.selectOption('Bus');
                    await ticketTypesCP.btnUpdate.click();
                    await expect(ticketTypesCP.overlayUpdatedSuccessfully).toBeVisible({timeout: 10000});
                    await page.waitForSelector('text=New Type');
                    await expect(page.locator('table').locator('text=' + name)).toBeVisible();
                });
            });
        });

        test.describe('Delete Ticket Type', (page) => {
            test.describe('UI elements', (page) => {
                const id30char = uuidv4();
                const name = id30char.substring(0, 20)+'name';
                test.beforeEach(async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await ticketTypesCP.btnNewTicketType.click();
                    await page.waitForSelector('text=Create a new Ticket Type');
                    await ticketTypesCP.inputName.fill(name);
                    await ticketTypesCP.inputPrice.fill('100');
                    await ticketTypesCP.inputPosition.fill('1');
                    await ticketTypesCP.selectIcon.selectOption('Adult');
                    await ticketTypesCP.selectVat.selectOption('10.00');
                    await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                    await ticketTypesCP.btnSubmit.click();
                    await expect(ticketTypesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});
                });
                test.afterEach(async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await page.locator('table').getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await ticketTypesCP.editTicketTypeDeleteTicketType.click();
                    await page.waitForSelector('text=Are you sure?');
                    await ticketTypesCP.confirmDeleteTicketType.click();
                    await page.waitForSelector('text=New Type');
                    await expect(page.locator('table').locator('text=' + name)).not.toBeVisible();
                });
                test('check all elements for delete ticket type', async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await page.getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await expect(ticketTypesCP.editTicketTypeDeleteTicketTypeHeading).toBeVisible();
                    await expect(ticketTypesCP.editTicketTypeDeleteTicketType).toBeVisible();
                });
                test('check for alert messages on delete ticket type', async ({ page }) => { // BUG: Can't open ticket typ again
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await page.getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await ticketTypesCP.editTicketTypeDeleteTicketType.click();
                    await page.waitForSelector('text=Are you sure?', {timeout: 10000});
                    await expect(ticketTypesCP.editTicketTypeDeleteTicketTypeAlertTitle).toBeVisible();
                    await expect(ticketTypesCP.editTicketTypeDeleteTicketTypeAlertMessage).toBeVisible();
                    await expect(ticketTypesCP.cancelDeleteTicketType).toBeVisible();
                    await ticketTypesCP.cancelDeleteTicketType.click();
                });
                test('should go back to edit ticket type', async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await page.getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await ticketTypesCP.editTicketTypeDeleteTicketType.click();
                    await ticketTypesCP.cancelDeleteTicketType.click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await expect(ticketTypesCP.editTicketTypeDeleteTicketTypeAlertMessage).not.toBeVisible();
                });
            });
            test.describe('Function', (page) => {
                const id30char = uuidv4();
                const name = id30char.substring(0, 20)+'name';
                test('should delete the ticket type', async ({ page }) => {
                    const ticketTypesCP = new TicketTypesCP(page);
                    await page.waitForSelector('text=New Type');
                    await ticketTypesCP.btnNewTicketType.click();
                    await page.waitForSelector('text=Create a new Ticket Type');
                    await ticketTypesCP.inputName.fill(name);
                    await ticketTypesCP.inputPrice.fill('100');
                    await ticketTypesCP.inputPosition.fill('1');
                    await ticketTypesCP.selectIcon.selectOption('Adult');
                    await ticketTypesCP.selectVat.selectOption('10.00');
                    await ticketTypesCP.selectTicketCategory.selectOption('alreadyExist');
                    await ticketTypesCP.btnSubmit.click();
                    await expect(ticketTypesCP.overlayCreatedSuccessfully).toBeVisible({timeout: 10000});

                    await page.waitForSelector('text=New Type');
                    await page.locator('table').getByText(name).first().click();
                    await page.waitForSelector('text=Edit Ticket Type');
                    await ticketTypesCP.editTicketTypeDeleteTicketType.click();
                    await page.waitForSelector('text=Are you sure?');
                    await ticketTypesCP.confirmDeleteTicketType.click();
                    await page.waitForSelector('text=New Type');
                    await expect(ticketTypesCP.overlayDeletedSuccessfully).toBeVisible();
                    await expect(page.locator('table').locator('text=' + name)).not.toBeVisible();
                });
            });
        });
        // test.describe('Delete User', (page) => {
        //     test.describe('check for UI elements', (page) => {
        //         const id30char = uuidv4();
        //         const username = id30char.substring(0, 20)+'username';
        //         test.beforeEach(async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await usersCP.btnNewUser.click();
        //             await page.waitForSelector('text=Create a new Ticket Type');
        //             await usersCP.inputUserName.fill(username);
        //             await usersCP.inputFirstName.fill('Test');
        //             await usersCP.inputLastName.fill('User');
        //             await usersCP.inputEmail.fill(username+'@email.com');
        //             await usersCP.btnSubmit.click();
        //             await page.waitForSelector('text=New Type');
        //         });
        //         test.afterEach(async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await page.getByText(username).first().click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await usersCP.editUserDeleteUser.click();
        //             await page.waitForSelector('text=Are you sure?');
        //             await usersCP.overlayDeleteUser.click();
        //             await page.waitForSelector('text=New Type');
        //             await expect(page.locator('table').locator('text=' + username)).not.toBeVisible();
        //         });
        //         test('check all elements for delete user', async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await page.getByText(username).first().click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await expect(usersCP.editUserDeleteUserHeading).toBeVisible();
        //             await expect(usersCP.editUserDeleteUser).toBeVisible();
        //         });
        //         test('check for alert messages on delete user', async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await page.getByText(username).first().click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await usersCP.editUserDeleteUser.click();
        //             await page.waitForSelector('text=Are you sure?');
        //             await expect(usersCP.editUserDeleteUserAlertTitle).toBeVisible();
        //             await expect(usersCP.editUserDeleteUserAlertMessage).toBeVisible();
        //             await expect(usersCP.editUserDeleteUserGoBack).toBeVisible();
        //             await usersCP.editUserDeleteUserGoBack.click();
        //         });
        //         test('should go back to edit user', async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await page.getByText(username).first().click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await usersCP.editUserDeleteUser.click();
        //             await usersCP.editUserDeleteUserGoBack.click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await expect(usersCP.editUserDeleteUserAlertMessage).not.toBeVisible();
        //         });
        //     });
        //     test.describe('Function', (page) => {
        //         const id30char = uuidv4();
        //         const username = id30char.substring(0, 20)+'username';
        //         test('should delete the user', async ({ page }) => {
        //             const usersCP = new UsersCP(page);
        //             await page.waitForSelector('text=New Type');
        //             await page.getByText(username).first().click();
        //             await page.waitForSelector('text=Edit Ticket Type');
        //             await usersCP.editUserDeleteUser.click();
        //             await page.waitForSelector('text=Are you sure?');
        //             await usersCP.overlayDeleteUser.click();
        //             await page.waitForSelector('text=New Type');
        //             await expect(usersCP.overlayDeletedSuccessfully).toBeVisible();
        //             await expect(page.locator('table').locator('text=' + username)).not.toBeVisible();
        //         });
        //     });
        // });
    });
});