# Finance App

## Git 명령어 모음

### 기본 명령어

```bash
# 저장소 복제
git clone [repository URL]

# 변경사항 확인
git status

# 변경사항 스테이징
git add .                # 모든 변경사항 추가
git add [파일명]         # 특정 파일만 추가

# 변경사항 커밋
git commit -m "feat: 새로운 기능 추가"

# 원격 저장소에 푸시
git push origin main
```

### 브랜치 관련

```bash
# 브랜치 목록 확인
git branch

# 새 브랜치 생성 및 전환
git checkout -b feature/login

# 브랜치 전환
git checkout main

# 브랜치 병합
git merge feature/login
```

### 변경사항 관리

```bash
# 변경사항 확인
git diff

# 커밋 히스토리 확인
git log
git log --oneline       # 한 줄로 보기

# 변경사항 되돌리기
git reset --hard HEAD^  # 직전 커밋으로 되돌리기
git reset --soft HEAD^  # 커밋만 되돌리기 (변경사항 유지)
```

### 커밋 컨벤션

```bash
# 기능 추가
git commit -m "feat: 로그인 기능 구현"

# 버그 수정
git commit -m "fix: 로그인 오류 수정"

# 리팩토링
git commit -m "refactor: 인증 로직 개선"

# 스타일 수정
git commit -m "style: 로그인 페이지 UI 개선"

# 문서 수정
git commit -m "docs: README 업데이트"

# 테스트 추가/수정
git commit -m "test: 로그인 테스트 케이스 추가"
```

### 자주 사용하는 시나리오

```bash
# 1. 새 기능 개발 시
git checkout -b feature/new-feature
git add .
git commit -m "feat: 새 기능 구현"
git push origin feature/new-feature

# 2. main 브랜치 업데이트
git checkout main
git pull origin main

# 3. 충돌 해결
git checkout feature/new-feature
git merge main
# 충돌 해결 후
git add .
git commit -m "merge: main 브랜치 병합 충돌 해결"
```

```

```
