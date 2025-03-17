import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const url = req.nextUrl;

    try {
        const jobs = await prisma.job.findMany({
            where: {status:"open",isVerified:true},
        })
        

        return NextResponse.json(jobs, {status:200});
    }
    catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}