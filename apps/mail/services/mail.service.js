// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()
export let unreadMailsCounter

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    readMail,
    sendMail,
    deleteMail,
    starMail,
    readManualy,
    saveDraft,

}

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function countUnreadMails(mails) {
    let mailCount = 0
    mails.forEach(mail => { if (!mail.isRead && !mail.removedAt) mailCount++ })
    return mailCount++
}


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            unreadMailsCounter = countUnreadMails(mails)
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
            }
            if (filterBy.isRead) {
                if (filterBy.isRead === 'false') filterBy.isRead = false
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.status) {
                switch (filterBy.status) {
                    case 'inbox':
                        mails = mails.filter(mail => (mail.to === loggedinUser.email && !mail.removedAt))
                        break
                    case 'sent':
                        mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt)
                        break
                    case 'trash':
                        mails = mails.filter(mail => mail.removedAt !== null && mail.removedAt)
                        break
                    case 'starred':
                        mails = mails.filter(mail => mail.isStarred)
                        break
                    case 'draft':
                        console.log('draft')
                        mails = mails.filter(mail => mail.isDraft && !mail.removedAt)
                        break
                }

            }
            if (filterBy.label && filterBy.status === 'inbox') {
                switch (filterBy.label) {
                    case 'main':
                        mails = mails.filter(mail => mail.labels.some(label => label === 'main'))
                        break
                    case 'social':
                        mails = mails.filter(mail => mail.labels.some(label => label === 'social'))
                        break
                    case 'promoted':
                        mails = mails.filter(mail => mail.labels.some(label => label === 'promoted'))
                        break
                    case 'updates':
                        mails = mails.filter(mail => mail.labels.some(label => label === 'updates'))
                        break
                }
            }
            if (filterBy.sortBy) {
                if (filterBy.sortBy === 'title') {
                    mails.sort((a, b) => a.subject.localeCompare(b.subject) * filterBy.sortDir)
                }
                else if (filterBy.sortBy === 'from') {
                    mails.sort((a, b) => a.from.localeCompare(b.from) * filterBy.sortDir)
                }
                else if (filterBy.sortBy === 'date') {
                    mails.sort((a, b) => (a.sentAt + b.sentAt) * filterBy.sortDir)
                }
            }

            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {

    return { to: '', subject: '', body: '', createdAt: Date.now(), isRead: true, removedAt: null }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        const mails = [
            {
                id: 'e101',
                createdAt: 1728724930500,
                subject: 'Welcome aboard!',
                body: 'Thanks for joining our platform. We’re excited to have you!',
                isRead: false,
                sentAt: 1728724930594,
                removedAt: null,
                from: 'support@company.com',
                to: 'user@appsus.com',
                labels: ['main'],
                color: 3,
            },
            {
                id: 'e102',
                createdAt: 1728754930500,
                subject: 'Your invoice is ready',
                body: 'Here’s your billing summary for this month.',
                isRead: true,
                sentAt: 1728754930594,
                removedAt: null,
                from: 'billing@service.io',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 6,
            },
            {
                id: 'e103',
                createdAt: 1728454930500,
                subject: 'Weekend Photos',
                body: 'Check out the photos from our trip!',
                isRead: false,
                sentAt: 1728454930594,
                removedAt: null,
                from: 'noa@gmail.com',
                to: 'user@appsus.com',
                labels: ['social'],
                color: 1,
            },
            {
                id: 'e104',
                createdAt: 1728304930500,
                subject: 'Project Update',
                body: 'We’ve made great progress this week!',
                isRead: true,
                sentAt: 1728304930594,
                removedAt: null,
                from: 'teamlead@startup.io',
                to: 'user@appsus.com',
                labels: ['main'],
                color: 5,
            },
            {
                id: 'e105',
                createdAt: 1728204930500,
                subject: 'Limited-time Offer!',
                body: 'Grab your 40% discount before it’s gone!',
                isRead: true,
                sentAt: 1728204930594,
                removedAt: null,
                from: 'deals@shopnow.com',
                to: 'user@appsus.com',
                labels: ['promoted'],
                color: 4,
            },
            {
                id: 'e106',
                createdAt: 1728124930500,
                subject: 'Flight Confirmation',
                body: 'Your flight to Paris has been booked successfully.',
                isRead: false,
                sentAt: 1728124930594,
                removedAt: null,
                from: 'travel@agency.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 7,
            },
            {
                id: 'e107',
                createdAt: 1727924930500,
                subject: 'Check this out!',
                body: 'A friend shared something cool with you.',
                isRead: true,
                sentAt: 1727924930594,
                removedAt: null,
                from: 'lior@friends.com',
                to: 'user@appsus.com',
                labels: ['social', 'main'],
                color: 2,
            },
            {
                id: 'e108',
                createdAt: 1727804930500,
                subject: 'Weekly Digest',
                body: 'Here’s what’s new this week.',
                isRead: false,
                sentAt: 1727804930594,
                removedAt: null,
                from: 'digest@medium.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 1,
            },
            {
                id: 'e109',
                createdAt: 1727754930500,
                subject: 'Event Reminder',
                body: 'Don’t forget your event tomorrow at 18:00.',
                isRead: true,
                sentAt: 1727754930594,
                removedAt: null,
                from: 'events@calendar.com',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 6,
            },
            {
                id: 'e110',
                createdAt: 1727654930500,
                subject: 'Team dinner invitation',
                body: 'Join us this Thursday!',
                isRead: false,
                sentAt: 1727654930594,
                removedAt: null,
                from: 'hr@company.com',
                to: 'user@appsus.com',
                labels: ['main', 'social'],
                color: 4,
            },
            {
                id: 'e111',
                createdAt: 1727554930500,
                subject: 'Your package has shipped',
                body: 'Track your order here.',
                isRead: false,
                sentAt: 1727554930594,
                removedAt: null,
                from: 'orders@store.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 2,
            },
            {
                id: 'e112',
                createdAt: 1727494930500,
                subject: 'Security Alert',
                body: 'Unusual login attempt detected.',
                isRead: true,
                sentAt: 1727494930594,
                removedAt: null,
                from: 'security@service.com',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 5,
            },
            {
                id: 'e113',
                createdAt: 1727404930500,
                subject: 'We miss you!',
                body: 'Come back for a 50% discount.',
                isRead: false,
                sentAt: 1727404930594,
                removedAt: null,
                from: 'sales@marketplace.com',
                to: 'user@appsus.com',
                labels: ['promoted'],
                color: 7,
            },
            {
                id: 'e114',
                createdAt: 1727304930500,
                subject: 'Photo memories',
                body: 'Your memories from last year are ready to view.',
                isRead: true,
                sentAt: 1727304930594,
                removedAt: null,
                from: 'photos@cloud.com',
                to: 'user@appsus.com',
                labels: ['social', 'updates'],
                color: 1,
            },
            {
                id: 'e115',
                createdAt: 1727254930500,
                subject: 'System Maintenance',
                body: 'Scheduled downtime tomorrow from 2AM–3AM.',
                isRead: false,
                sentAt: 1727254930594,
                removedAt: null,
                from: 'status@hosting.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 3,
            },
            {
                id: 'e116',
                createdAt: 1727104930500,
                subject: 'Special invitation',
                body: 'You’ve been invited to join our closed event.',
                isRead: false,
                sentAt: 1727104930594,
                removedAt: null,
                from: 'invite@network.com',
                to: 'user@appsus.com',
                labels: ['social', 'main'],
                color: 2,
            },
            {
                id: 'e117',
                createdAt: 1727004930500,
                subject: 'Newsletter',
                body: 'Stay updated with the latest news.',
                isRead: true,
                sentAt: 1727004930594,
                removedAt: null,
                from: 'news@company.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 5,
            },
            {
                id: 'e118',
                createdAt: 1726904930500,
                subject: 'Join our webinar',
                body: 'Learn the latest tools for developers.',
                isRead: false,
                sentAt: 1726904930594,
                removedAt: null,
                from: 'events@devhub.com',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 6,
            },
            {
                id: 'e119',
                createdAt: 1726754930500,
                subject: 'Your subscription renewal',
                body: 'Your plan has been renewed successfully.',
                isRead: true,
                sentAt: 1726754930594,
                removedAt: null,
                from: 'billing@platform.com',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 1,
            },
            {
                id: 'e120',
                createdAt: 1726704930500,
                subject: 'Happy Birthday!',
                body: 'Wishing you an amazing day 🎉',
                isRead: false,
                sentAt: 1726704930594,
                removedAt: null,
                from: 'team@friends.com',
                to: 'user@appsus.com',
                labels: ['social', 'main'],
                color: 7,
            },
            {
                id: 'e121',
                createdAt: 1726604930500,
                subject: 'Monthly Performance Report',
                body: 'Here’s how your campaign performed this month.',
                isRead: true,
                sentAt: 1726604930594,
                removedAt: null,
                from: 'analytics@company.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 3,
            },
            {
                id: 'e122',
                createdAt: 1726504930500,
                subject: 'Exclusive access',
                body: 'You’re one of the few to get early access.',
                isRead: false,
                sentAt: 1726504930594,
                removedAt: null,
                from: 'invite@specials.com',
                to: 'user@appsus.com',
                labels: ['promoted', 'main'],
                color: 5,
            },
            {
                id: 'e123',
                createdAt: 1726404930500,
                subject: 'Password reset requested',
                body: 'Click here to reset your password.',
                isRead: true,
                sentAt: 1726404930594,
                removedAt: null,
                from: 'security@service.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 4,
            },
            {
                id: 'e124',
                createdAt: 1726304930500,
                subject: 'Order confirmation',
                body: 'Thanks for shopping with us!',
                isRead: false,
                sentAt: 1726304930594,
                removedAt: null,
                from: 'store@shop.com',
                to: 'user@appsus.com',
                labels: ['updates', 'promoted'],
                color: 2,
            },
            {
                id: 'e125',
                createdAt: 1726254930500,
                subject: 'Friend request',
                body: 'Omer wants to connect with you.',
                isRead: false,
                sentAt: 1726254930594,
                removedAt: null,
                from: 'network@social.com',
                to: 'user@appsus.com',
                labels: ['social'],
                color: 6,
            },
            {
                id: 'e126',
                createdAt: 1726154930500,
                subject: 'Payment received',
                body: 'We have successfully received your payment.',
                isRead: true,
                sentAt: 1726154930594,
                removedAt: null,
                from: 'billing@finance.com',
                to: 'user@appsus.com',
                labels: ['updates', 'main'],
                color: 1,
            },
            {
                id: 'e127',
                createdAt: 1726104930500,
                subject: 'New job alert',
                body: 'We found positions matching your skills!',
                isRead: false,
                sentAt: 1726104930594,
                removedAt: null,
                from: 'jobs@career.com',
                to: 'user@appsus.com',
                labels: ['promoted', 'updates'],
                color: 7,
            },
            {
                id: 'e128',
                createdAt: 1726004930500,
                subject: 'Let’s catch up!',
                body: 'How about dinner this weekend?',
                isRead: false,
                sentAt: 1726004930594,
                removedAt: null,
                from: 'noa@gmail.com',
                to: 'user@appsus.com',
                labels: ['social'],
                color: 3,
            },
            {
                id: 'e129',
                createdAt: 1725904930500,
                subject: 'Important update to our terms',
                body: 'Please review our updated terms of service.',
                isRead: true,
                sentAt: 1725904930594,
                removedAt: null,
                from: 'legal@company.com',
                to: 'user@appsus.com',
                labels: ['updates'],
                color: 2,
            },
            {
                id: 'e130',
                createdAt: 1725804930500,
                subject: 'Discount on your next trip ✈️',
                body: 'Book your next vacation and save 25%!',
                isRead: false,
                sentAt: 1725804930594,
                removedAt: null,
                from: 'travel@agency.com',
                to: 'user@appsus.com',
                labels: ['promoted'],
                color: 4,
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


function _createMail(vendor, speed = 250) {
    const mail = getEmptyMail(vendor, speed)
    mail.id = makeId()
    return mail
}

function deleteMail(mailId) {
    return get(mailId)
        .then(mail => {
            mail.removedAt = Date.now()
            return mail
        })
        .then(save)

}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') || ''
    const status = searchParams.get('status') || 'inbox'
    const isStared = searchParams.get('stared') || ''
    const sortBy = searchParams.get('sortBy') || ''
    const sortDir = searchParams.get('sortDir') || ''
    const label = searchParams.get('label') || 'main'
    return {
        txt,
        isRead,
        status,
        isStared,
        sortBy,
        sortDir,
        label
    }
}

function saveDraft(mail) {
    if (!mail.isDraft) mail.isDraft = true
    return save(mail)
}



function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMAil) => currMAil.id === mail.id)
        const nextCar = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevCar = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        car.nextmailId = nextCar.id
        car.prevmailId = prevCar.id
        return car
    })
}


function readMail(mail) {

    mail.isRead = true
    return save(mail)

}

function readManualy(mail) {
    mail.isRead = !mail.isRead
    return save(mail)
}

function sendMail(mail) {
    mail.from = loggedinUser.email
    mail.sentAt = Date.now()
    mail.isDraft = false
    return save(mail)
}

function starMail(mail) {
    if (!mail.isStarred) {
        mail.isStarred = true
        console.log(mail)
    }
    else mail.isStarred = !mail.isStarred
    return save(mail)
}