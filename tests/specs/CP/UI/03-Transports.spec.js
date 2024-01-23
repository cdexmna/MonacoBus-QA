import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import {loginCS} from '../../../helper/CS/functions.js';
import {DimiDI} from '../../../credentials-DI.json';
import {DimiCS} from '../../../credentials-CS.json';
import { Home } from 'wd/lib/special-keys.js';
import TransportsScreen from '../../../screenObjects/CP/Transports.screen.js';
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
test.setTimeout(180000);
const lang = "en"
const languageFile = JSON.parse(fs.readFileSync("tests/i18n/" + lang + "-CP.json"));
const strings = languageFile.screens.home;

/* *********************
replaced all btnLogin.click() to bounding box script because the button can't be found by it's default locator
    await loginScreenDI.btnLogin.click();
*************************



*/

// TODO: This has to be handled with environment variables (check AdmireMe)
const pageURL = 'https://ticketing-admin-frontend-j6hga.ondigitalocean.app/';
const id30char = uuidv4();
const identifier = id30char.substring(0, 20);


test.describe('Transports page', (page) => {

    test.beforeEach(async ({ page }) => {
        await page.goto(pageURL, {waitUntil: 'load', timeout: 0});
        const loginScreenCP = new LoginScreenCP(page);
        const navigationCP = new NavigationCP(page);
        const transportsCP = new TransportsCP(page);
        await loginScreenCP.inputUsername.fill(testUserCS.username);
        // await page.waitForTimeout(1000);
        await loginScreenCP.inputPassword.fill(testUserCS.password);
        // await page.waitForTimeout(1000);
        await loginScreenCP.inputUsername.click();
        await page.waitForTimeout(1000);
        await loginScreenCP.btnLogin.click();
        await page.waitForSelector('text=Dashboard');
        await navigationCP.linkTransports.click();
        await page.waitForSelector('text=New Transport');
    });
    // test.afterEach(async ({ page}) => {
    //     const navigationCP = new NavigationCP(page);
    //     const loginScreenCP = new LoginScreenCP(page)
    //     await navigationCP.hiAmigo.click();
    //     await navigationCP.signOut.click();
    //     await page.waitForSelector('text=Please sign in');
    // });
    test('should show all UI elements', async ({ page }) => {
        const transportsCP = new TransportsCP(page);
        await page.waitForSelector('text=New Transport')
        await expect(transportsCP.btnNewTransport).toBeVisible();
        await transportsCP.btnNewTransport.click();
        await expect(transportsCP.textCreateANewTransport).toBeVisible();
        await expect(transportsCP.btnBack).toBeVisible();
        await expect(transportsCP.textIncludeANewTransport).toBeVisible();
        await expect(transportsCP.inputIdentifier).toBeVisible();
        await expect(transportsCP.inputManufacturer).toBeVisible();
        await expect(transportsCP.inputLastOdometerReading).toBeVisible();
        await expect(transportsCP.selectStatus).toBeVisible();
        await expect(transportsCP.selectTransportType).toBeVisible();
        await expect(transportsCP.btnSubmit).toBeVisible();
    });
    test.describe('New Transport', (page) => {
        test.describe('Input fields', (page) => {
            test.beforeEach(async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                await transportsCP.btnNewTransport.click();
            });
            test.describe('Identifier', (page) => {
                test('should test identifier field for required', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.btnNewTransport.click();
                    await transportsCP.btnSubmit.click();
                    await expect(transportsCP.errorLabelIdentifierRequired).toBeVisible({timeout:10000});
                    await transportsCP.inputIdentifier.fill('Test Identifier');
                    await expect(transportsCP.errorLabelIdentifierRequired).not.toBeVisible({timeout:10000});
                });

                test('max characters', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputIdentifier.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890');
                    await transportsCP.inputLastOdometerReading.click();
                    await expect(transportsCP.errorLabelMaxChars).toBeVisible({timeout:10000});
                });

                test('min characters', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputIdentifier.fill('1');
                    await transportsCP.inputLastOdometerReading.click();
                    await expect(transportsCP.errorLabelMinChars).toBeVisible({timeout:10000});
                });

                test('special characters', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputIdentifier.fill('!@#$%^&*()');
                    await transportsCP.inputLastOdometerReading.click();
                    await expect(transportsCP.errorLabelSpecialChars).toBeVisible({timeout:10000});
                });
            });

            test.describe('Last odometer reading', (page) => {
                test('should test last odometer reading field for required', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.btnSubmit.click();
                    await expect(transportsCP.errorLabelLastOdometerReadingRequired).toBeVisible({timeout:10000});
                    await transportsCP.inputLastOdometerReading.fill('e');
                    await expect(transportsCP.errorLabelLastOdometerReadingRequired).not.toBeVisible({timeout:10000});
                });

                test('max number', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputLastOdometerReading.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890');
                    await expect(transportsCP.errorLabelMaxChars).toBeVisible({timeout:10000});
                });

                test('negative number', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputLastOdometerReading.fill('-100');
                    await transportsCP.inputIdentifier.fill('Test Identifier');
                    await transportsCP.selectStatus.selectOption({ label: 'available' });
                    await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                    await transportsCP.btnSubmit.click();
                    await expect(transportsCP.errorLabelLastOdometerReading).toBeVisible({timeout:10000});
                });
        
                // Uncomment and adjust the following test once the manufacturer field is available
                /*
                test('should test manufacturer field for limits', async () => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.btnSubmit.click();
                    await expect(transportsCP.errorLabelManufacturerRequired).toBeVisible({timeout:10000});
                    await transportsCP.inputManufacturer.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890');
                    await expect(transportsCP.errorLabelManufacturerRequired).not.toBeVisible({timeout:10000});
                    await transportsCP.inputManufacturer.fill('Test Manufacturer');
                });
                */
            });
            test.describe('Manufacturer', (page) => {
                test('should test manufacturer field for limits', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.btnSubmit.click();
                    await expect(transportsCP.errorLabelManufacturerRequired).toBeVisible({timeout:10000});
                    await transportsCP.inputManufacturer.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890');
                    await expect(transportsCP.errorLabelManufacturerRequired).not.toBeVisible({timeout:10000});
                    await transportsCP.inputManufacturer.fill('Test Manufacturer');
                });
                test('max characters', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputManufacturer.fill('12345678901234567890123456789012345678901234567890123456789012345678901234567890');
                    await transportsCP.inputLastOdometerReading.click();
                    await expect(transportsCP.errorLabelMaxChars).toBeVisible({timeout:10000});
                });
                test('min characters', async ({ page }) => {
                    const transportsCP = new TransportsCP(page);
                    await transportsCP.inputManufacturer.fill('1');
                    await transportsCP.inputLastOdometerReading.click();
                    await expect(transportsCP.errorLabelMinChars).toBeVisible({timeout:10000});
                });
            });

        });
        test.describe('Selects', (page) => {
            let transportsCP;
        
            test.beforeEach(async ({ page }) => {
                transportsCP = new TransportsCP(page);
                await transportsCP.btnNewTransport.click();
            });

            test('should test status select for limits', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                await transportsCP.btnSubmit.click();
                await expect(transportsCP.errorLabelStatusRequired).toBeVisible({timeout:10000});
                await transportsCP.selectStatus.selectOption({ label: 'available' });
                await expect(transportsCP.errorLabelStatusRequired).not.toBeVisible({timeout:10000});
            });

            test('should test transport type select for limits', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                await transportsCP.btnSubmit.click();
                await expect(transportsCP.errorLabelTransportTypeRequired).toBeVisible({timeout:10000});
                await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                await expect(transportsCP.errorLabelTransportTypeRequired).not.toBeVisible({timeout:10000});
            });
        });
        
        test.describe('Function', (page) => {
            test.afterEach(async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                await page.getByText(identifier).first().click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportDeleteTransport.click();
                await page.waitForSelector('text=Are you sure?');
                await transportsCP.overlayDeleteTransport.click();
                await page.waitForSelector('text=New Transport');
            });
            test('should create a new transport', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                const manufacturer = 'Test Manufacturer';
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                await transportsCP.btnNewTransport.click();
                await page.waitForSelector('text=Create a new transport');
                await transportsCP.inputIdentifier.fill(identifier);
                await transportsCP.inputManufacturer.fill(manufacturer);
                await transportsCP.inputLastOdometerReading.fill('1000');
                await transportsCP.selectStatus.selectOption({ label: 'available' });
                await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                await transportsCP.btnSubmit.click();
                await page.waitForSelector('text=New Transport');
                await expect(page.locator('text=' + identifier)).toBeVisible();
                // await expect(page.locator('text=' + identifier + ' - ' + manufacturer)).toBeVisible();
            });
        });
        test.describe('Create a new transport', (page) => {
            test.beforeEach(async ({ page }) => {
                const navigationCP = new NavigationCP(page);
                const transportsCP = new TransportsCP(page);
                const loginScreenCP = new LoginScreenCP(page);
                await loginScreenCP.inputUsername.fill(testUserCS.username);
                await loginScreenCP.inputPassword.fill(testUserCS.password);
                await loginScreenCP.btnLogin.click();
                await page.waitForSelector('text=Dashboard');
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
            });
            test.fixme('should show the new transport in the Select Your Vehicle select', async ({ page }) => {
                const loginScreenDI = new LoginScreenDI(page, lang);
                const transportsCP = new TransportsCP(page);
                const id30char = uuidv4();
                const identifier = id30char.substring(0, 20);
                await transportsCP.btnNewTransport.click();
                await page.waitForSelector('text=Create a new transport');
                await transportsCP.inputIdentifier.fill(identifier);
                await transportsCP.inputLastOdometerReading.fill('1000');
                // await transportsCP.inputManufacturer.fill(manufacturer);
                await transportsCP.selectStatus.selectOption({ label: 'available' });
                await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                await transportsCP.btnSubmit.click();
                await page.waitForSelector('text=New Transport');
                
                await page.goto('https://seashell-app-pkyfy.ondigitalocean.app/');
                
                await loginScreenDI.textUsername.fill(testUserDI.username);
                await loginScreenDI.textPassword.fill(testUserDI.password);
                await loginScreenDI.btnLogin.click();
                await page.waitForSelector('text=Select Your Vehicle');
                await loginScreenDI.drpSelectAVehicle.click();
                await loginScreenDI.drpSelectAVehicle.selectOption({ label: identifier + ' -' });
                // await expect(page.locator('text=' + identifier + ' -')).toBeVisible();
                await expect(loginScreenDI.drpSelectAVehicle).toContainText(identifier + ' -');
            });
        });
    });
    test.describe('Edit Transport', (page) => {
        const identifierEdit = id30char.substring(0, 20);
        test.beforeEach(async ({ page }) => {
            const manufacturer = 'Test Manufacturer';
            const transportsCP = new TransportsCP(page);
            
            await page.waitForSelector('text=New Transport');
            await transportsCP.btnNewTransport.click();
            await page.waitForSelector('text=Create a new transport');
            await transportsCP.inputIdentifier.fill(identifierEdit);
            await transportsCP.inputManufacturer.fill(manufacturer);
            await transportsCP.inputLastOdometerReading.fill('1000');
            await transportsCP.selectStatus.selectOption({ label: 'available' });
            await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
            await transportsCP.btnSubmit.click();
            await page.waitForSelector('text=New Transport');
        });
        test.afterEach(async ({ page }) => {
            const transportsCP = new TransportsCP(page);    
            await page.getByText(identifierEdit).first().click();
            await page.waitForSelector('text=Edit Transport');
            await transportsCP.editTransportDeleteTransport.click();
            await page.waitForSelector('text=Are you sure?');
            await transportsCP.overlayDeleteTransport.click();
            await page.waitForSelector('text=New Transport');
        });
        test.describe('check for UI elements', (page) => {
            test('tapping the transport identifier should open the edit transport wrapper', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierEdit, {exact: true}).click();
                await page.waitForSelector('text=Edit Transport');
                await expect(transportsCP.editTransportHeading).toBeVisible();
                await expect(transportsCP.editTransportStatus).toBeVisible();
                await expect(transportsCP.editTransportUpdateTransport).toBeVisible();
                await expect(transportsCP.editTransportDeleteTransportHeading).toBeVisible();
                await expect(transportsCP.editTransportDeleteTransport).toBeVisible();
            });
        });
        test.describe('Function', (page) => {
            test('should update the transport - all fields', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierEdit, {exact: true}).click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportIdentifier.fill(identifierEdit + ' Edited ID');
                await transportsCP.editTransportLastOdometerReading.fill('2000');
                await transportsCP.editTransportStatus.selectOption({ label: 'out of service' });
                await transportsCP.editTransportTransportType.selectOption({ label: 'Train' });
                await transportsCP.editTransportManufacturer.fill('Edited Manufacturer');
                await transportsCP.editTransportUpdateTransport.click();
                await page.waitForSelector('text=New Transport');
                await expect(transportsCP.overlayUpdatedSuccessfully).toBeVisible();
                await expect(page.getByRole('row', { name: identifierEdit+' 1000 Bus available Test Manufacturer' })).not.toBeVisible();
                await expect(page.getByRole('row', { name: identifierEdit + ' Edited ID 2000 Train out of service Edited Manufacturer' })).toBeVisible();
                // await expect(transportsCP.editTransportHeading).not.toBeVisible();
            });
        });
    });
    test.describe('Delete Transports', (page) => {
        test.describe('check for UI elements', (page) => {
            const identifierDelete = id30char.substring(0, 30);
            test.beforeEach(async ({ page }) => {
                const manufacturer = 'Test Manufacturer';
                const transportsCP = new TransportsCP(page);
                
                await page.waitForSelector('text=New Transport');
                await transportsCP.btnNewTransport.click();
                await page.waitForSelector('text=Create a new transport');
                await transportsCP.inputIdentifier.fill(identifierDelete);
                await transportsCP.inputManufacturer.fill(manufacturer);
                await transportsCP.inputLastOdometerReading.fill('1000');
                await transportsCP.selectStatus.selectOption({ label: 'available' });
                await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                await transportsCP.btnSubmit.click();
                await page.waitForSelector('text=New Transport');
            });
            test.afterEach(async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                await page.getByText(identifierDelete).first().click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportDeleteTransport.click();
                await page.waitForSelector('text=Are you sure?');
                await transportsCP.overlayDeleteTransport.click();
                await page.waitForSelector('text=New Transport');
            });
            test('check all elements for delete transports', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierDelete).click();
                await page.waitForSelector('text=Edit Transport');
                // await transportsCP.editTransportDeleteTransport.click();
                await page.waitForSelector('text=New Transport');
                await expect(transportsCP.editTransportDeleteTransportHeading).toBeVisible();
                await expect(transportsCP.editTransportDeleteTransport).toBeVisible();
            });
            test('check for alert messages on delete transport', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierDelete).click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportDeleteTransport.click();
                await page.waitForSelector('text=Are you sure?');
                await expect(transportsCP.editTransportDeleteTransportAlertTitle).toBeVisible();
                await expect(transportsCP.editTransportDeleteTransportAlertMessage).toBeVisible();
                await expect(transportsCP.editTransportDeleteTransportGoBack).toBeVisible();
                await transportsCP.editTransportDeleteTransportGoBack.click();
            });
            test('should go back to edit transport', async ({ page }) => {
                const transportsCP = new TransportsCP(page);
                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierDelete).first().click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportDeleteTransport.click();
                await transportsCP.editTransportDeleteTransportGoBack.click();
                await page.waitForSelector('text=Edit Transport');
                await expect(transportsCP.editTransportDeleteTransportAlertMessage).not.toBeVisible();
            });
        });
        test.describe('Function', (page) => {
            test('should delete the transport', async ({ page }) => {
                const identifierDelete = id30char.substring(0, 30);
                const manufacturer = 'Test Manufacturer';
                const transportsCP = new TransportsCP(page);
                
                await page.waitForSelector('text=New Transport');
                await transportsCP.btnNewTransport.click();
                await page.waitForSelector('text=Create a new transport');
                await transportsCP.inputIdentifier.fill(identifierDelete);
                await transportsCP.inputManufacturer.fill(manufacturer);
                await transportsCP.inputLastOdometerReading.fill('1000');
                await transportsCP.selectStatus.selectOption({ label: 'available' });
                await transportsCP.selectTransportType.selectOption({ label: 'Bus' });
                await transportsCP.btnSubmit.click();
                await page.waitForSelector('text=New Transport');

                const navigationCP = new NavigationCP(page);
                
                await navigationCP.linkTransports.click();
                await page.waitForSelector('text=New Transport');
                
                await page.getByText(identifierDelete).first().click();
                await page.waitForSelector('text=Edit Transport');
                await transportsCP.editTransportDeleteTransport.click();
                await page.waitForSelector('text=Are you sure?');
                await transportsCP.overlayDeleteTransport.click();
                await expect(transportsCP.overlayDeletedSuccessfully).toBeVisible();
                await page.waitForSelector('text=New Transport');
                await expect(page.getByRole('row', { name: identifierDelete + ' 2000 Train out of service Edited Manufacturer' })).not.toBeVisible();
            });
        });
    });
});

