#!/usr/bin/env python3
"""
Simple development server for the Space Tourism Portal 2090
Serves the static files and handles SPA routing
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    """Handler that serves index.html for all routes (SPA routing)"""
    
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # If no path or path doesn't exist, serve index.html
        if not path or not os.path.exists(path):
            # Check if it's an API call or asset
            if (path.startswith('src/') or 
                path.startswith('public/') or 
                path.endswith('.js') or 
                path.endswith('.css') or 
                path.endswith('.json') or 
                path.endswith('.ico')):
                # Let the default handler try to serve it
                super().do_GET()
            else:
                # Serve index.html for SPA routing
                self.path = '/index.html'
                super().do_GET()
        else:
            super().do_GET()

def main():
    PORT = 3000
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🚀 Space Tourism Portal 2090 Development Server")
    print(f"📡 Starting server on http://localhost:{PORT}")
    print(f"📁 Serving from: {os.getcwd()}")
    print(f"🌌 Ready for space exploration!")
    print(f"\n   Press Ctrl+C to stop the server\n")
    
    try:
        with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped. Safe travels, space explorer!")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Please stop other servers or use a different port.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
