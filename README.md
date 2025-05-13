# 재무관리 웹 애플리케이션

## 프로젝트 개요

이 프로젝트는 개인 및 가계 재무를 관리하기 위한 웹 애플리케이션입니다. Next.js와 TypeScript를 기반으로 제작되었으며, 현대적인 웹 개발 아키텍처와 패턴을 적용했습니다.

## 주요 기능

1. 수입/지출 관리

   - 거래 내역 기록
   - 카테고리별 분류
   - 정기 거래 설정

2. 예산 관리

   - 월간/연간 예산 설정
   - 카테고리별 예산 할당
   - 예산 달성률 추적

3. 리포트 및 분석
   - 지출 패턴 분석
   - 카테고리별 지출 비중
   - 기간별 재무 현황

## 기술 스택 상세 설명

### 프론트엔드 핵심

1. **Next.js 13+ (App Router)**

   - 서버 사이드 렌더링(SSR) 지원
   - 파일 기반 라우팅
   - API 라우트 내장
   - 최적화된 이미지 처리

2. **TypeScript**
   - 정적 타입 검사
   - 개발 시 에러 방지
   - 코드 자동 완성
   - 리팩토링 용이성

### 상태 관리

1. **Zustand**

   ```typescript
   // 사용 예시
   import create from "zustand";

   interface FinanceState {
     balance: number;
     transactions: Transaction[];
     addTransaction: (transaction: Transaction) => void;
   }

   const useFinanceStore = create<FinanceState>((set) => ({
     balance: 0,
     transactions: [],
     addTransaction: (transaction) =>
       set((state) => ({
         transactions: [...state.transactions, transaction],
       })),
   }));
   ```

2. **TanStack Query**

   ```typescript
   // 사용 예시
   import { useQuery } from "@tanstack/react-query";

   function useTransactions() {
     return useQuery({
       queryKey: ["transactions"],
       queryFn: () => fetch("/api/transactions").then((res) => res.json()),
     });
   }
   ```

### 날짜 처리

**date-fns**

```typescript
// 사용 예시
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

const formattedDate = format(parseISO("2024-03-15"), "yyyy년 MM월 dd일", {
  locale: ko,
});
```

## 아키텍처 상세 설명

### Clean Architecture 레이어

1. **Presentation Layer** (UI)

   - 컴포넌트 (`/components`)
   - 페이지 (`/app`)
   - 레이아웃

2. **Domain Layer** (비즈니스 로직)

   - 엔티티
   - 유스케이스
   - 리포지토리 인터페이스

3. **Data Layer**
   - API 통신
   - 데이터베이스 연동
   - 외부 서비스 통합

### 데이터 흐름

UI → Store (Zustand) → API Layer → Backend
↑ ↑
└──── TanStack Query 캐시 관리 ──────┘

## 개발 의존성

- **@types/node**: Node.js TypeScript 타입 정의
- **@types/react**: React TypeScript 타입 정의
- **@types/react-dom**: React DOM TypeScript 타입 정의

## 프로젝트 아키텍처

### 폴더 구조

src/
├── app/ # Next.js 13+ App Router
│ ├── layout.tsx # 루트 레이아웃
│ ├── page.tsx # 홈페이지
│ └── (routes)/ # 페이지 라우트
├── components/ # 리액트 컴포넌트
│ ├── ui/ # 공통 UI 컴포넌트
│ ├── forms/ # 폼 관련 컴포넌트
│ └── charts/ # 차트 컴포넌트
├── lib/ # 유틸리티 및 설정
│ ├── store/ # Zustand 스토어
│ ├── utils/ # 유틸리티 함수
│ └── types/ # TypeScript 타입 정의
└── api/ # API 라우트 핸들러
└── routes/ # API 엔드포인트

### 아키텍처 패턴

- **Clean Architecture** 원칙 적용
  - 비즈니스 로직과 UI 로직의 분리
  - 의존성 역전 원칙 (DIP) 준수
  - 테스트 용이성 확보

### 상태 관리 전략

1. **클라이언트 상태 (Zustand)**

   - 사용자 인터페이스 상태
   - 폼 데이터
   - 필터 및 정렬 설정

2. **서버 상태 (TanStack Query)**
   - API 응답 데이터
   - 캐시 관리
   - 실시간 데이터 동기화

## 개발 가이드라인

### 컴포넌트 설계 원칙

1. **단일 책임 원칙 (SRP)**

   - 각 컴포넌트는 하나의 책임만 가짐
   - 재사용성 극대화

2. **컴포넌트 구조**

   ```typescript
   // 예시: 거래내역 컴포넌트
   interface TransactionProps {
     date: Date;
     amount: number;
     category: string;
   }

   export function Transaction({ date, amount, category }: TransactionProps) {
     // 컴포넌트 로직
   }
   ```

### 상태 관리 패턴

1. **로컬 상태**: React useState
2. **전역 상태**: Zustand
3. **서버 상태**: TanStack Query

### API 통신 패턴

```typescript
// API 요청 예시
async function fetchTransactions() {
  const response = await fetch("/api/transactions");
  if (!response.ok) {
    throw new Error("API 요청 실패");
  }
  return response.json();
}
```

### 디렉토리 구조 상세 설명

#### 1. src/app/ 디렉토리

페이지와 라우팅을 담당하는 핵심 디렉토리입니다.

**파일 구조와 역할:**

- `layout.tsx`: 공통 레이아웃 정의
  ```typescript
  // 예시: 모든 페이지에 네비게이션과 푸터를 포함
  export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <Navigation />
          {children}
          <Footer />
        </body>
      </html>
    );
  }
  ```
- `page.tsx`: 홈페이지 ('/' 경로)
- `(routes)/`: 그룹화된 라우트 디렉토리
  - 괄호()를 사용하여 URL 구조에 영향을 주지 않는 조직화

#### 2. src/components/ 디렉토리

재사용 가능한 UI 컴포넌트들을 저장합니다.

**하위 디렉토리 구조:**

```
components/
├── ui/ # 기본 UI 컴포넌트
│ ├── Button/
│ ├── Card/
│ └── Navigation/
├── forms/ # 폼 관련 컴포넌트
│ ├── InputField/
│ └── SelectBox/
└── charts/ # 데이터 시각화 컴포넌트
├── BarChart/
└── PieChart/
```

**컴포넌트 작성 규칙:**

- 하나의 컴포넌트 = 하나의 디렉토리
- index.tsx로 컴포넌트 export
- 관련 스타일과 타입을 같은 디렉토리에 포함

#### 3. src/lib/ 디렉토리

비즈니스 로직과 유틸리티 함수를 포함합니다.

```
lib/
├── store/ # Zustand 상태 관리
│ ├── useFinanceStore.ts
│ └── useUserStore.ts
├── utils/ # 유틸리티 함수
│ ├── formatters.ts
│ └── validators.ts
└── types/ # TypeScript 타입 정의
├── finance.ts
└── user.ts
```

#### 4. src/api/ 디렉토리

API 라우트와 외부 서비스 통신 로직을 관리합니다.

```
api/
├── routes/ # API 엔드포인트
│ ├── transactions/
│ └── reports/
└── services/ # 외부 서비스 통신
└── database/
```

### 컴포넌트 설계 원칙

1. **단일 책임 원칙**

   - 각 컴포넌트는 하나의 명확한 역할만 수행
   - 재사용성과 유지보수성 향상

2. **컴포넌트 분류**

   - Presentational Components: UI 표현에 집중
   - Container Components: 데이터 처리와 상태 관리

3. **네이밍 컨벤션**
   - 컴포넌트: PascalCase (예: TransactionList)
   - 유틸리티 함수: camelCase (예: formatCurrency)
   - 타입/인터페이스: PascalCase (예: TransactionType)

### 상태 관리 구조

1. **로컬 상태**

   - React의 useState 사용
   - 컴포넌트 내부에서만 필요한 상태 관리

2. **전역 상태 (Zustand)**

   ```typescript
   // lib/store/useFinanceStore.ts
   import create from "zustand";

   interface FinanceState {
     transactions: Transaction[];
     addTransaction: (transaction: Transaction) => void;
   }

   export const useFinanceStore = create<FinanceState>((set) => ({
     transactions: [],
     addTransaction: (transaction) =>
       set((state) => ({
         transactions: [...state.transactions, transaction],
       })),
   }));
   ```
