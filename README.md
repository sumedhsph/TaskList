# TaskList — Production-Grade Todo App

**Live Demo:** https://tasklistcicd.vercel.app

![Preview](https://res.cloudinary.com/dw2v0g5i8/image/upload/v1732450000/tasklist-preview.png)
*(Screenshot jald add kar dena ya Vercel ka auto preview use kar lena)*

### Features
- Add, toggle, and delete tasks
- Beautiful modern UI with pure CSS (no Tailwind)
- Fully typed with TypeScript
- 100% test coverage with Vitest + coverage report
- Strict CI/CD pipeline with GitHub Actions
- Main branch fully protected (no force push, no merge without passing tests)
- Auto deploy to Vercel only when tests pass
- Feature branches get automatic testing

### Tech Stack
- React + TypeScript
- Vite blazing_fast
- Vitest + React Testing Library
- GitHub Actions (CI/CD)
- Vercel (Hosting)

### CI/CD Pipeline
```yaml
on: push to main → run tests → if pass → deploy to Vercel
on: PR to main → run tests → block merge if tests fail