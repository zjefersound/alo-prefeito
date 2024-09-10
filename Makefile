.PHONY: backend frontend

# Run database
db:
	cd backend && \
	docker compose up -d 

# Run database seed
seed:
	cd backend && \
	npm run seed:dev

# Run backend tasks
backend:
	cd backend && \
	mkdir uploads && \
	npm install && \
	npx prisma migrate dev && \
	npm run dev

# Run frontend tasks
frontend:
	cd frontend && \
	npm install && \
	npm run dev
