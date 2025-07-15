# Server
from http.server import HTTPServer, BaseHTTPRequestHandler
from database import init_db #, save_preset, load_preset
import json


class RequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.protocol_version = 'HTTP/1.1'
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:5173')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Length', '0')
        self.end_headers()


    def do_GET(self):
        print("test")


    def do_POST(self):
        self.protocol_version = 'HTTP/1.1'
        if self.path == '/save':
            try:  
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length).decode('utf-8')
                data = json.loads(post_data)
                print(f"Received: {data}")
                
                cube1_col = data['cube1_colour']
                cube2_col = data['cube2_colour']
                cube3_col = data['cube3_colour']

                #TODO::save data in db

                response_body = json.dumps({'status': 'success'}).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', 'http://localhost:5173')
                self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.send_header('Content-Length', str(len(response_body)))
                self.send_header('Connection', 'close')
                self.end_headers()
                self.wfile.write(response_body)
                self.wfile.flush()
  
            except Exception as e:
                print(f"Error: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'text/plain')
                self.end_headers()
                self.wfile.write(f"Server error: {str(e)}".encode('utf-8'))


def run():
    init_db()
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Server running on port {server_address[1]}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()