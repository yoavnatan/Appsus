// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.body) {
                mails = mails.filter(car => car.speed >= filterBy.minSpeed)
            }
            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
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

function getEmptyMail(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1728703930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometime.',
                isRead: false,
                sentAt: 1728703930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                createdAt: 1728704930500,
                subject: 'Project update',
                body: 'Hey, just wanted to give you a quick update about the project status.',
                isRead: true,
                sentAt: 1728704930594,
                removedAt: null,
                from: 'noa@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                createdAt: 1728705930500,
                subject: 'Invoice for September',
                body: 'Attached is the invoice for your September subscription.',
                isRead: false,
                sentAt: 1728705930594,
                removedAt: null,
                from: 'billing@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                createdAt: 1728706930500,
                subject: 'Weekend plans?',
                body: 'Are you free this weekend for a quick getaway?',
                isRead: false,
                sentAt: 1728706930594,
                removedAt: null,
                from: 'maya@friends.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                createdAt: 1728707930500,
                subject: 'Meeting rescheduled',
                body: 'The meeting was moved to 3PM instead of 2PM.',
                isRead: true,
                sentAt: 1728707930594,
                removedAt: null,
                from: 'team@work.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                createdAt: 1728708930500,
                subject: 'Your order has shipped!',
                body: 'Your package is on the way! Track it using the link below.',
                isRead: false,
                sentAt: 1728708930594,
                removedAt: null,
                from: 'store@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                createdAt: 1728709930500,
                subject: 'Welcome to our platform!',
                body: 'We’re excited to have you on board. Here’s how to get started.',
                isRead: true,
                sentAt: 1728709930594,
                removedAt: null,
                from: 'support@platform.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                createdAt: 1728710930500,
                subject: 'Password reset request',
                body: 'We received a request to reset your password. Click below to continue.',
                isRead: false,
                sentAt: 1728710930594,
                removedAt: null,
                from: 'security@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                createdAt: 1728711930500,
                subject: 'Happy Birthday!',
                body: 'Wishing you a wonderful birthday filled with joy and laughter!',
                isRead: true,
                sentAt: 1728711930594,
                removedAt: null,
                from: 'team@celebrate.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                createdAt: 1728712930500,
                subject: 'Your subscription expires soon',
                body: 'Your current plan will expire in 3 days. Renew now to avoid interruption.',
                isRead: false,
                sentAt: 1728712930594,
                removedAt: null,
                from: 'noreply@plans.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                createdAt: 1728713930500,
                subject: 'Flight booking confirmation',
                body: 'Your flight to Rome has been confirmed. See details below.',
                isRead: false,
                sentAt: 1728713930594,
                removedAt: null,
                from: 'bookings@airtravel.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e112',
                createdAt: 1728714930500,
                subject: 'Daily digest',
                body: 'Here’s your daily news summary from around the world.',
                isRead: true,
                sentAt: 1728714930594,
                removedAt: null,
                from: 'news@daily.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e113',
                createdAt: 1728715930500,
                subject: 'Join our beta program',
                body: 'We’re inviting a few users to test our new app version.',
                isRead: false,
                sentAt: 1728715930594,
                removedAt: null,
                from: 'beta@startup.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e114',
                createdAt: 1728716930500,
                subject: 'Coffee tomorrow?',
                body: 'Hey, wanna grab coffee tomorrow morning?',
                isRead: true,
                sentAt: 1728716930594,
                removedAt: null,
                from: 'dan@friends.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e115',
                createdAt: 1728717930500,
                subject: 'New comment on your post',
                body: 'Someone commented on your latest photo. Check it out!',
                isRead: false,
                sentAt: 1728717930594,
                removedAt: null,
                from: 'notify@social.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e116',
                createdAt: 1728718930500,
                subject: 'Thank you for your feedback!',
                body: 'We appreciate you taking the time to share your thoughts with us.',
                isRead: true,
                sentAt: 1728718930594,
                removedAt: null,
                from: 'feedback@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e117',
                createdAt: 1728719930500,
                subject: 'Concert tickets available',
                body: 'Tickets for your favorite artist are now on sale!',
                isRead: false,
                sentAt: 1728719930594,
                removedAt: null,
                from: 'events@music.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e118',
                createdAt: 1728720930500,
                subject: 'Security alert',
                body: 'A new login to your account was detected. Was this you?',
                isRead: false,
                sentAt: 1728720930594,
                removedAt: null,
                from: 'alerts@system.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e119',
                createdAt: 1728721930500,
                subject: 'Your refund has been processed',
                body: 'We’ve refunded your recent purchase. Expect it in 3–5 business days.',
                isRead: true,
                sentAt: 1728721930594,
                removedAt: null,
                from: 'support@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e120',
                createdAt: 1728722930500,
                subject: 'Let’s collaborate!',
                body: 'I think our teams could work well together. Interested in a quick call?',
                isRead: false,
                sentAt: 1728722930594,
                removedAt: null,
                from: 'alex@network.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


function _createMail(vendor, speed = 250) {
    const mail = getEmptyMail(vendor, speed)
    mail.id = makeId()
    return mail
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const body = searchParams.get('body') || ''
    return {
        txt,
        body
    }
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



