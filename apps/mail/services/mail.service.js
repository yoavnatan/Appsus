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

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
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
                        mails = mails.filter(mail => mail.isDraft && !mail.removedAt)
                }

            }
            if (filterBy.label) {
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
                        mails = mails.filter(mail => mail.labels.some(label => label === 'main'))
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
                createdAt: 1728703930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometime.',
                isRead: false,
                sentAt: 1728703930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                labels: ['main', 'social']
            },
            {
                id: 'e102',
                createdAt: 1728704930500,
                subject: 'Project update',
                body: 'Quick update about the project status.',
                isRead: true,
                sentAt: 1728704930594,
                removedAt: null,
                from: 'noa@company.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e103',
                createdAt: 1728705930500,
                subject: 'Invoice for September',
                body: 'Attached is your September invoice.',
                isRead: false,
                sentAt: 1728705930594,
                removedAt: null,
                from: 'billing@service.com',
                to: 'user@appsus.com',
                labels: ['main', 'promoted', 'updates']
            },
            {
                id: 'e104',
                createdAt: 1728706930500,
                subject: 'Weekend plans?',
                body: 'Are you free this weekend?',
                isRead: false,
                sentAt: 1728706930594,
                removedAt: null,
                from: 'maya@friends.com',
                to: 'user@appsus.com',
                labels: ['social']
            },
            {
                id: 'e105',
                createdAt: 1728707930500,
                subject: 'Meeting rescheduled',
                body: 'The meeting was moved to 3PM.',
                isRead: true,
                sentAt: 1728707930594,
                removedAt: null,
                from: 'team@work.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e106',
                createdAt: 1728708930500,
                subject: 'Your order has shipped!',
                body: 'Your package is on the way!',
                isRead: false,
                sentAt: 1728708930594,
                removedAt: null,
                from: 'store@shop.com',
                to: 'user@appsus.com',
                labels: ['main', 'promoted']
            },
            {
                id: 'e107',
                createdAt: 1728709930500,
                subject: 'Welcome to our platform!',
                body: 'We’re excited to have you on board.',
                isRead: true,
                sentAt: 1728709930594,
                removedAt: null,
                from: 'support@platform.com',
                to: 'user@appsus.com',
                labels: ['updates']
            },
            {
                id: 'e108',
                createdAt: 1728710930500,
                subject: 'Password reset request',
                body: 'Click below to reset your password.',
                isRead: false,
                sentAt: 1728710930594,
                removedAt: null,
                from: 'security@service.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e109',
                createdAt: 1728711930500,
                subject: 'Happy Birthday!',
                body: 'Wishing you a wonderful day!',
                isRead: true,
                sentAt: 1728711930594,
                removedAt: null,
                from: 'team@celebrate.com',
                to: 'user@appsus.com',
                labels: ['main', 'social']
            },
            {
                id: 'e110',
                createdAt: 1728712930500,
                subject: 'Subscription expiring soon',
                body: 'Your plan will expire in 3 days.',
                isRead: false,
                sentAt: 1728712930594,
                removedAt: null,
                from: 'noreply@plans.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e111',
                createdAt: 1728713930500,
                subject: 'Flight booking confirmation',
                body: 'Your flight to Rome is confirmed.',
                isRead: false,
                sentAt: 1728713930594,
                removedAt: null,
                from: 'bookings@airtravel.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e112',
                createdAt: 1728714930500,
                subject: 'Daily digest',
                body: 'Your daily news summary.',
                isRead: true,
                sentAt: 1728714930594,
                removedAt: null,
                from: 'news@daily.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e113',
                createdAt: 1728715930500,
                subject: 'Join our beta program',
                body: 'We’re inviting users to test our new version.',
                isRead: false,
                sentAt: 1728715930594,
                removedAt: null,
                from: 'beta@startup.com',
                to: 'user@appsus.com',
                labels: ['promoted']
            },
            {
                id: 'e114',
                createdAt: 1728716930500,
                subject: 'Coffee tomorrow?',
                body: 'Wanna grab coffee tomorrow?',
                isRead: true,
                sentAt: 1728716930594,
                removedAt: null,
                from: 'dan@friends.com',
                to: 'user@appsus.com',
                labels: ['main', 'social']
            },
            {
                id: 'e115',
                createdAt: 1728717930500,
                subject: 'New comment on your post',
                body: 'Someone commented on your latest post.',
                isRead: false,
                sentAt: 1728717930594,
                removedAt: null,
                from: 'notify@social.com',
                to: 'user@appsus.com',
                labels: ['social', 'updates']
            },
            {
                id: 'e116',
                createdAt: 1728718930500,
                subject: 'Thank you for your feedback!',
                body: 'We appreciate your thoughts.',
                isRead: true,
                sentAt: 1728718930594,
                removedAt: null,
                from: 'feedback@company.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e117',
                createdAt: 1728719930500,
                subject: 'Concert tickets available',
                body: 'Tickets are now on sale!',
                isRead: false,
                sentAt: 1728719930594,
                removedAt: null,
                from: 'events@music.com',
                to: 'user@appsus.com',
                labels: ['promoted', 'main']
            },
            {
                id: 'e118',
                createdAt: 1728720930500,
                subject: 'Security alert',
                body: 'A new login was detected.',
                isRead: false,
                sentAt: 1728720930594,
                removedAt: null,
                from: 'alerts@system.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e119',
                createdAt: 1728721930500,
                subject: 'Your refund has been processed',
                body: 'Expect your refund in 3–5 days.',
                isRead: true,
                sentAt: 1728721930594,
                removedAt: null,
                from: 'support@shop.com',
                to: 'user@appsus.com',
                labels: ['main', 'promoted']
            },
            {
                id: 'e120',
                createdAt: 1728722930500,
                subject: 'Let’s collaborate!',
                body: 'Interested in a quick call?',
                isRead: false,
                sentAt: 1728722930594,
                removedAt: null,
                from: 'alex@network.com',
                to: 'user@appsus.com',
                labels: ['main']
            },
            {
                id: 'e121',
                createdAt: 1728723930500,
                subject: 'Black Friday deals!',
                body: 'Massive discounts just for you.',
                isRead: false,
                sentAt: 1728723930594,
                removedAt: null,
                from: 'sales@shopmore.com',
                to: 'user@appsus.com',
                labels: ['main', 'promoted']
            },
            {
                id: 'e122',
                createdAt: 1728724930500,
                subject: 'Team dinner invitation',
                body: 'Join us this Thursday!',
                isRead: false,
                sentAt: 1728724930594,
                removedAt: null,
                from: 'hr@company.com',
                to: 'user@appsus.com',
                labels: ['main', 'social']
            },
            {
                id: 'e123',
                createdAt: 1728725930500,
                subject: 'Weekly performance report',
                body: 'Your weekly stats are ready.',
                isRead: true,
                sentAt: 1728725930594,
                removedAt: null,
                from: 'reports@dashboard.com',
                to: 'user@appsus.com',
                labels: ['updates']
            },
            {
                id: 'e124',
                createdAt: 1728726930500,
                subject: 'Check our new blog post',
                body: '10 tips to boost productivity.',
                isRead: false,
                sentAt: 1728726930594,
                removedAt: null,
                from: 'blog@contenthub.com',
                to: 'user@appsus.com',
                labels: ['main', 'promoted', 'updates']
            },
            {
                id: 'e125',
                createdAt: 1728727930500,
                subject: 'Your package is delayed',
                body: 'We’re sorry for the delay.',
                isRead: false,
                sentAt: 1728727930594,
                removedAt: null,
                from: 'shipping@store.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e126',
                createdAt: 1728728930500,
                subject: 'Join our referral program',
                body: 'Earn rewards by inviting friends!',
                isRead: true,
                sentAt: 1728728930594,
                removedAt: null,
                from: 'rewards@platform.com',
                to: 'user@appsus.com',
                labels: ['promoted', 'main']
            },
            {
                id: 'e127',
                createdAt: 1728729930500,
                subject: 'System maintenance notice',
                body: 'Maintenance tonight at 2AM.',
                isRead: false,
                sentAt: 1728729930594,
                removedAt: null,
                from: 'it@service.com',
                to: 'user@appsus.com',
                labels: ['updates']
            },
            {
                id: 'e128',
                createdAt: 1728730930500,
                subject: 'Congrats on your promotion!',
                body: 'We’re thrilled to announce your promotion!',
                isRead: true,
                sentAt: 1728730930594,
                removedAt: null,
                from: 'manager@company.com',
                to: 'user@appsus.com',
                labels: ['main', 'social']
            },
            {
                id: 'e129',
                createdAt: 1728731930500,
                subject: 'Welcome to our newsletter',
                body: 'Expect weekly updates!',
                isRead: false,
                sentAt: 1728731930594,
                removedAt: null,
                from: 'newsletter@updates.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            },
            {
                id: 'e130',
                createdAt: 1728732930500,
                subject: 'Final reminder: Survey closing soon',
                body: 'Last chance to share your thoughts!',
                isRead: false,
                sentAt: 1728732930594,
                removedAt: null,
                from: 'feedback@survey.com',
                to: 'user@appsus.com',
                labels: ['main', 'updates']
            }
        ]
        mails.forEach(mail => mail.color = utilService.getRandomIntInclusive(1, 4))
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
    const status = searchParams.get('status') || ''
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