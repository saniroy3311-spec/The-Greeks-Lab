from html.parser import HTMLParser
import sys

class TestHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.errors = 0

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)

    def handle_endtag(self, tag):
        if tag in self.tags:
            self.tags.remove(tag)

    def error(self, message):
        print(f"Parser error: {message}")
        self.errors += 1

def main():
    file_path = 'templates/dashboard.html'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        parser = TestHTMLParser()
        parser.feed(content)
        
        if parser.errors == 0:
            print("HTML Syntax check passed: template parses successfully.")
            sys.exit(0)
        else:
            print(f"HTML Syntax check failed with {parser.errors} errors.")
            sys.exit(1)
            
    except Exception as e:
        print(f"HTML Syntax check failed with exception: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
