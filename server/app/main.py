from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.database import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup: Connecting to MongoDB")
    await connect_to_mongo()
    
    # Print all mounted routes for debugging 404 issues
    print("\n--- MOUNTED ROUTES ---")
    for route in app.routes:
        if hasattr(route, "methods"):
            print(f"Route: {route.path} [{', '.join(route.methods)}]")
    print("----------------------\n")
    
    yield
    print("Shutdown: Closing MongoDB connection")
    await close_mongo_connection()

app = FastAPI(
    title="E-waste Management API",
    openapi_url="/api/v1/openapi.json",
    lifespan=lifespan
)

@app.middleware("http")
async def log_headers(request, call_next):
    print(f"\n--- REQUEST HEADERS [{request.method} {request.url.path}] ---")
    if "authorization" in request.headers:
        print(f"Auth Header: {request.headers['authorization'][:30]}...")
    else:
        print("Auth Header: MISSING")
    
    # Also log Content-Type for diagnostics
    if "content-type" in request.headers:
        print(f"Content-Type: {request.headers['content-type']}")
        
    print("-----------------------------------------\n")
    return await call_next(request)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change this to specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Welcome to the E-waste Management API"}
