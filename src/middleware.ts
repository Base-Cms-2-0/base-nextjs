import { NextRequest, NextResponse } from 'next/server'

const requestLimit = 60
const timeWindow = 60 * 1000
const requestCounts = new Map<string, { count: number; timestamp: number }>()

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const langMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
    const langPrefix = langMatch ? `/${langMatch[1]}` : ''

    const clientIP = req?.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown'
    console.log('Client IP:', clientIP)

    const now = Date.now()
    const requestData = requestCounts.get(clientIP)

    if (requestData) {
        if (now - requestData.timestamp < timeWindow) {
            if (requestData.count >= requestLimit) {
                console.log('Request limit exceeded for IP:', clientIP);
                return NextResponse.redirect(new URL(`${langPrefix}/auth/conflict`, req.url))
            }
            requestData.count++
        } else {
            requestCounts.set(clientIP, { count: 1, timestamp: now })
        }
    } else {
        requestCounts.set(clientIP, { count: 1, timestamp: now })
    }

    const token = req.cookies.get('token')?.value

    console.log('Language prefix:', langPrefix)

    const protectedPaths = ['/dashboard', '/profile', '/api/protected-route'];
    const protectedPatterns = ['/dashboard/', '/profile/', '/api/protected-route/']

    const pathWithoutLang = langPrefix ? pathname.substring(langPrefix.length) : pathname

    const isProtected =
        protectedPaths.includes(pathWithoutLang) ||
        protectedPatterns.some(pattern => pathWithoutLang.startsWith(pattern))

    if (pathWithoutLang.startsWith('/auth/login') && token) {
        return NextResponse.redirect(new URL(`${langPrefix}/dashboard`, req.url))
    }

    if (isProtected && !token) {
        const loginUrl = new URL(`${langPrefix}/auth/login`, req.url)
        return NextResponse.redirect(loginUrl)
    }

    console.log('Proceeding to next middleware/page');
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/:locale(en|vi)/dashboard/:path*',
        '/:locale(en|vi)/profile/:path*',
        '/:locale(en|vi)/api/protected-route/:path*',
        '/:locale(en|vi)/dashboard',
        '/:locale(en|vi)/profile',
        '/:locale(en|vi)/api/protected-route',
        '/:locale(en|vi)/auth/login',
        '/:locale(en|vi)/api/login',
    ],
}
