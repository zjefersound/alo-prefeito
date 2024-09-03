.PHONY: backend frontend

# Run database
db:
	cd backend && \
	docker compose up 

# Run backend tasks
backend:
	cd backend && \
	npm install && \
	npx prisma migrate dev && \
	npm run dev

# Run frontend tasks
frontend:
	cd frontend && \
	npm install && \
	npm run dev
