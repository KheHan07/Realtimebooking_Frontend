Real-Time Ticket Booking System - Frontend
    This is the Angular frontend of the Real-Time Ticket Booking System, which integrates with a Spring Boot backend to provide a real-time interface for managing ticket sales, vendors, and customers. The system supports live updates, configuration saving, and full control via a user-friendly interface.

Introduction
    The Real-Time Ticket Booking System enables administrators to manage ticket sales in real-time. The system dynamically updates ticket statistics, such as the number of tickets released by vendors, tickets bought by customers, and total tickets sold out. This frontend is built with Angular and communicates with a Spring Boot backend for data and WebSocket updates.

System Workflow

    Configuration:
        Begin by configuring the system's parameters on the "Configure System" page. You can set values such as the total tickets, ticket release rate, customer retrieval rate, and maximum ticket capacity.
        
    Control Panel:
        Move to the "Control Panel" page, where you can:
        Set the number of vendors and customers.
        Start the system to initiate ticket release and sales processes.
        Stop the system to halt ticket operations.
        Reset the system to clear current statistics and configurations.

    Live Updates and Statistics:
        Monitor live updates of ticket activities in the "Live Ticket Updates" section.
        View ticket statistics, such as tickets released by each vendor, total tickets bought by customers, and total tickets sold out.

    Saving Configurations:
        Save different system configurations for reuse. Saved configurations are displayed in a table and can be selected for future use.

Features
    Configure ticket system parameters.
    Dynamically set the number of vendors and customers.
    Start, stop, and reset the system as needed.
    Monitor real-time ticket updates using WebSocket.
    Save and reuse system configurations.

Prerequisites
    Before setting up the frontend, ensure you have:
    Node.js (v16 or above recommended)
    Angular CLI (v14 or above recommended)
    A running Spring Boot backend (ensure it listens on http://localhost:8080).

Usage Instructions
    Step 1: Configure the System
        Navigate to the "Configure System" page.
        Set the following parameters:
        Total tickets
        Ticket release rate
        Customer retrieval rate
        Maximum ticket capacity
        Save the configuration for reuse, if needed.

    Step 2: Control Panel
        Navigate to the "Control Panel" page.
        Set the number of vendors and customers.
        Click "Set Vendors and Buyers" to apply these settings.

    Step 3: Start, Stop, and Reset
        Click "Start System" to begin ticket release and customer ticket purchase operations.
        Use "Stop System" to halt the process.
        Click "Reset System" to clear all current settings and start fresh.

    Step 4: Monitor Updates and Statistics
        Live Updates: The "Live Ticket Updates" section will show real-time logs of ticket-related activities.
        Ticket Statistics: View detailed stats, including:
        Tickets released by each vendor.
        Tickets bought by customers.
        Total tickets sold out.

Technologies Used
    Frontend Framework: Angular
    Real-Time Updates: RxJS and STOMP.js for WebSocket communication
    UI Design: HTML5, CSS3, TypeScript
    Styling: Custom CSS with a responsive design
    Backend: Spring Boot (not included in this repository)

Notes
    Ensure the Spring Boot backend is running before starting the frontend.
    The backend provides the WebSocket endpoint (/topic/ticket-updates) and REST APIs for ticket operations.
    Save configurations to make future system setups quicker.