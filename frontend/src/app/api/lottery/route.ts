
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Lottery from '@/model/lottery';
import { nanoid } from 'nanoid';


export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const {  name, createdAt, endedAt, price, totalNumber, active, winners } = data;

    if ( !name || !createdAt || !endedAt || price === undefined || totalNumber === undefined  || active === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields:  name, createdAt, endedAt, price, totalNumber, active' },
        { status: 400 }
      );
    }

    const newLottery = new Lottery({
      id : nanoid(),
      name,
      createdAt: new Date(createdAt),
      endedAt: new Date(endedAt),
      price,
      totalNumber,
      active,
      participants: [],
      description: data.description || '',
      img: data.img || [],
      winners: winners || [],
    });

    const savedLottery = await newLottery.save();
    return NextResponse.json(savedLottery, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to create lottery', error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectToDatabase();

    const lotteries = await Lottery.find({});
    return NextResponse.json(lotteries, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch lotteries', error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // http://localhost:3000/api/lottery?id=123
    if (!id) {
      return NextResponse.json({ message: 'Missing lottery id' }, { status: 400 });
    }

    const deletedLottery = await Lottery.findOneAndDelete({ id });

    if (!deletedLottery) {
      return NextResponse.json({ message: 'Lottery not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lottery deleted', lottery: deletedLottery }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to delete lottery', error: error.message },
      { status: 500 }
    );
  }}

