const LoginScreen = require('../../screenObjects/CS/login.screen');
const loginCS = async (page, user) => {
    const loginScreen = new LoginScreen(page);
    await page.goto('https://ticketing-app-staging-cnvs3.ondigitalocean.app/admin/login/?next=/admin/');
    await page.getByRole('link', { name: 'Django administration' }).waitFor({state:"visible"});
    await loginScreen.textUsername.fill(user.username);
    await loginScreen.textPassword.fill(user.password);
    await loginScreen.btnLogin.click();
};

const pickNotifClub = async (page) => {
    await page.getByText('A Notif Test Club').click();
}

const setAuth = async (page, auth) => {
    await page.setExtrahHTTPHeaders({authorization: auth})
}

const nextWeek = async (page, booking) => {
    await page.locator('div').filter({ hasText: /^Unfilled BookingAction NeededFilled BookingSpecial EventAuditionDayWeekMonth$/ }).getByRole('button').nth(1).click();
}

const createBooking = async (page, booking) => {
    
    await page.getByRole('link', { name: 'Booking Calendar' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Create Booking' }).click();
    await page.getByRole('combobox', { name: 'Start' }).selectOption(booking.start.format("hh:mmA"));
    await page.getByRole('combobox', { name: 'Ends' }).selectOption(booking.end.format("hh:mmA"));
    await page.getByRole('combobox', { name: 'Booking Type' }).selectOption('day');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(3000);
    
}

const deleteBooking = async (page, booking) => {
    const bookingRange = `${booking.start.format("h:mm")} - ${booking.end.format("h:mm")}`
    await page.getByRole('link', { name: 'Booking Calendar' }).click();
    await page.locator('a').filter({ hasText: `D${bookingRange}` }).last().click();
    await page.locator('.booking-modal-header_bookingIconArea__vG9Ba > svg > path').last().click();
    // await page.locator('.booking-modal-header_bookingIconArea__vG9Ba > svg > path').first().click();
    await page.waitForTimeout(3000);
}

// TODO: make function for Filled 1/10
const deleteEvent = async (page, event) => {
    const bookingRange = `${event.start.format("h:mm")} - ${event.end.format("h:mm")}`
    await page.getByRole('link', { name: 'Booking Calendar' }).click();
    await page.locator('a').filter({ hasText: `E${bookingRange}` }).last().click();
    
    await page.locator('.booking-modal-header_bookingIconArea__vG9Ba > svg > path').last().click();
    // await page.locator('.booking-modal-header_bookingIconArea__vG9Ba > svg > path').first().click();
    await page.waitForTimeout(3000);
}

// TODO: Refactor inviteBooking to use GROUP and DANCER parameters!
const inviteBooking = async (page, booking) => {
    const bookingRange = `${booking.start.format("h:mm a")}-${booking.end.format("h:mm a")}`
    await page.getByRole('button', { name: 'Entertainers' }).click();
        
    await page.getByRole('link', { name: 'Manage Groups' }).click();
    await page.getByRole('link', { name: 'dancer.first_image?.thumb' }).first().click();
    await page.locator('.dancer-grid-item_checkboxWrapper__FZi42 > .staged-checkbox_stagedCheckbox__5FF\\+7 > span').click();
    await page.getByRole('button', { name: 'INVITE' }).click();
    await page.getByRole('button', { name: 'Bookings' }).click();
    await page.getByRole('button', { name: `${bookingRange} 10 spots left` }).click();
    await page.locator('form').getByRole('button', { name: 'INVITE' }).click();
    await page.waitForTimeout(3000);
}

const inviteBusiness = async (page) => {
    await page.getByRole('button', { name: 'Entertainers' }).click();
        
    await page.getByRole('link', { name: 'Manage Groups' }).click();
    await page.getByRole('link', { name: 'dancer.first_image?.thumb' }).first().click();
    await page.locator('.dancer-grid-item_checkboxWrapper__FZi42 > .staged-checkbox_stagedCheckbox__5FF\\+7 > span').click();
    await page.getByRole('button', { name: 'INVITE' }).click();
    await page.locator('form').getByRole('button', { name: 'INVITE' }).click();
}

const createNotifyEvent = async (page, booking) => {
    await page.getByRole('link', { name: 'Booking Calendar' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Create Booking' }).click();
    await page.getByRole('combobox', { name: 'Start' }).selectOption(booking.start.format("hh:mmA"));
    await page.getByRole('combobox', { name: 'Ends' }).selectOption(booking.end.format("hh:mmA"));
    await page.getByRole('combobox', { name: 'Booking Type' }).selectOption('event');
    await page.getByLabel('Event Name').fill('Test event for Notification');
    await page.getByLabel('Event Description').fill('Test event for notifications');

    await page.locator('div').filter({ hasText: /^Notify New Booking To Groups0 Selected$/ }).getByRole('button', { name: '0 Selected' }).click();
    await page.getByText('Notif Group', { exact: true }).click();
    await page.getByText('Notify New Booking To Groups').click();
    // await page.locator('div').filter({ hasText: /^Notify New Booking To Groups1 Selected$/ }).getByRole('button', { name: '1 Selected' }).click();

    await page.getByRole('button', { name: 'Save' }).click();
    
    await page.waitForTimeout(3000);
}

const acceptBooking = async (page, dancer, booking) => {
    await page.getByRole('button', { name: 'Manage Requests' }).click();
    await page.getByRole('link', { name: 'Bookings' }).click();

    await clickBookingButton(page, dancer, booking, "ACCEPT");
}

const rejectBooking = async (page, dancer, booking) => {
    await page.getByRole('button', { name: 'Manage Requests' }).click();
    await page.getByRole('link', { name: 'Bookings' }).click();

    await clickBookingButton(page, dancer, booking, "REJECT");
}

const rejectFromAccepted = async (page, dancer, booking) => {
    await page.getByRole('button', { name: 'Manage Requests' }).click();
    await page.getByRole('link', { name: 'Bookings' }).click();
    await page.getByRole('button', { name: 'Accepted' }).click();

    await clickBookingButton(page, dancer, booking, "REJECT");
}

const standbyBookingRequest = async (page, dancer, booking) => {
    await page.getByRole('button', { name: 'Manage Requests' }).click();
    await page.getByRole('link', { name: 'Bookings' }).click();

    await clickBookingButton(page, dancer, booking, "STANDBY");
}

// const acceptFromStandby = async (page) => {
//     await page.getByRole('button', { name: 'Manage Requests' }).click();
//     await page.getByRole('link', { name: 'Bookings' }).click();
//     await page.getByRole('button', { name: 'Standby (1)' }).click();
    
//     await page.getByRole('button', { name: 'ACCEPT', exact: true }).click();
// }

const addCourse = async (page) => {
    await page.getByRole('link', { name: 'Courses' }).click();
    await page.getByRole('button', { name: 'New Course' }).click();
    await page.getByLabel('Course Title').fill('Test Add Course Notification');
    await page.getByRole('button', { name: '0 Selected' }).click();
    await page.locator('form').getByText('Pole Work').click();
    await page.getByLabel('Course Url').click();
    await page.getByLabel('Course Url').fill('https://pp-tutorial-videos.s3-us-west-1.amazonaws.com/Air+Walk.mp4');
    await page.getByLabel('Image Url').fill('https://yt3.ggpht.com/a/AATXAJzifxGounO-xD32n52Q-AYT19nojxFHpVTnsSA5LQ=s288-c-k-c0xffffffff-no-rj-mo');
    await page.getByLabel('Description').fill('Test Add Course Notification');
    await page.getByRole('button', { name: 'Submit' }).click();
}

const removeCourse = async (page) => {
    await page.getByRole('link', { name: 'Courses' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Test Add Course Notification' }).getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
}

const rejectDoB = async (page) => {
    await page.getByRole('link', { name: 'DOB Change' }).click();
    await page.locator('.flex > div').getByRole('button', { name: 'Reject Change' }).last().click();
    await page.getByRole('button', { name: 'Invalid ID/Unreadable' }).click();
    await page.locator('div').filter({ hasText: 'Request rejected successfully' }).nth(3).click();
}

const acceptDoB = async (page) => {
    await page.getByRole('link', { name: 'DOB Change' }).click();
    await page.locator('.flex > div').getByRole('button', { name: 'Approve Change' }).last().click();
    await page.getByText('Date of birth updated successfully').click();
}

const blastGroup = async (page) => {
    await page.getByRole('button', { name: 'Entertainers' }).click();
    await page.getByRole('link', { name: 'Manage Groups' }).click();
    await page.getByRole('link', { name: 'dancer.first_image?.thumb' }).first().click();
    await page.getByRole('button', { name: 'BLAST' }).click();
    await page.getByLabel('English Title').fill('English Test Notification - Group');
    await page.getByLabel('English Message').fill('English Test notification');
    await page.getByRole('button', { name: 'Submit' }).click();
}

const removeBlastGroup = async (page) => {
    await page.getByRole('link', { name: 'Group Notification' }).click();
    await page.locator('.group-notification-item_deleteBtn__eqpA8').first().click();
    await page.locator('div').filter({ hasText: 'Announcement Deleted Successfully' }).nth(3).click();
}

const blastAll = async (page) => {
    await page.getByRole('link', { name: 'Blast Notification' }).click();
    await page.getByRole('button', { name: 'Send Notification' }).click();
    await page.getByRole('combobox', { name: 'Target Audience' }).selectOption('all_users');
    await page.getByLabel('English Title').fill('English Test Notification - All Users');
    await page.getByLabel('English Message').fill('English Test notification');
    await page.getByRole('button', { name: 'Submit' }).click();
}

const blastDancers = async (page) => {
    await page.getByRole('link', { name: 'Blast Notification' }).click();
    await page.getByRole('button', { name: 'Send Notification' }).click();
    await page.getByRole('combobox', { name: 'Target Audience' }).selectOption('all_dancers');
    await page.getByLabel('English Title').fill('English Test Notification - All Dancers');
    await page.getByLabel('English Message').fill('English Test notification');
    await page.getByRole('button', { name: 'Submit' }).click();
}

const sendMessage = async (page) => {
    await page.getByRole('button', { name: 'Entertainers' }).click();
    await page.getByRole('link', { name: 'Manage Groups' }).click();
    await page.getByRole('link', { name: 'dancer.first_image?.thumb' }).first().click();
    await page.getByText('Pipi', { exact: true }).click();
    await page.getByRole('combobox').selectOption('2');
    await page.getByPlaceholder('Message Pipi').fill('Test message for Notification2');
    await page.getByRole('button', { name: 'Send' }).click();
}
const clickBookingButton = async (page, dancer, booking, buttonName) => {
    const matchString = "Start:.*, " + booking.start.format("h:mma") + ".*End:.*" + booking.end.format("h:mma");
    const timeMatcher = new RegExp(matchString);
    await page.getByRole('listitem')
        .filter({ hasText: timeMatcher })
        .filter({ hasText: dancer.name })
        .getByRole('button', { name: buttonName })
        .click();
}

export {loginCS, pickNotifClub, createBooking, deleteBooking, deleteEvent, inviteBooking, inviteBusiness, createNotifyEvent, acceptBooking, rejectBooking, standbyBookingRequest, addCourse, removeCourse, rejectDoB, acceptDoB, blastGroup, removeBlastGroup, blastAll, blastDancers, sendMessage, rejectFromAccepted };


