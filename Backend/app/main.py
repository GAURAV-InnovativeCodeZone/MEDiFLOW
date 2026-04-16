from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import router
from app.domains.appointments.router import router as appointment_router
from app.domains.queues.router import router as queues_router


def create_app() -> FastAPI:
    """
    Application factory pattern. 
    This is a production best practice for testing and configuration.
    """
    app = FastAPI(
        title="MEDiFLOW API",
        description="Advanced Hospital Management System",
        version="1.0.0"
    )

    # Set up CORS for future frontend integration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Restrict this in production!
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

     # Register router
    app.include_router(appointment_router, prefix="/api/v1")
    app.include_router(queues_router, prefix="/api/v1")
    
    @app.get("/health", tags=["System"])
    async def health_check():
        """
        Standard load-balancer health check endpoint.
        """
        return {"status": "ok", "system": "MEDiFLOW"}

    return app

app = create_app()
