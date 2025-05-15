// src/lib/db/mongodb.ts 파일 생성
import { MongoClient } from 'mongodb';

// 환경변수에서 MongoDB URI 가져오기
if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI가 설정되지 않았습니다.');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 개발 환경에서는 전역 변수 사용
if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // 프로덕션에서는 새로운 연결
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;