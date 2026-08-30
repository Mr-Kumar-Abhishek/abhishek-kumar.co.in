import os
import datetime

BASE_URL = "https://abhishek-kumar.co.in"

def get_priority(depth):
    if depth == 0:
        return "1.0000"
    elif depth == 1:
        return "0.8000"
    elif depth == 2:
        return "0.6400"
    elif depth == 3:
        return "0.5120"
    else:
        return "0.4096"

def generate():
    books = [
        "computer-science-for-grade-11-for-cbse-2026-2027",
        "CS-grade-12-for-CBSE",
        "accountancy-grade-11-for-cbse",
        "accountancy-grade-12-for-cbse",
        "mathematics-grade-11-for-cbse",
        "mathematics-for-grade-12-for-cbse",
        "applied-mathematics-for-grade-11-cbse",
        "applied-mathematics-for-grade-12-cbse",
        "ai-grade-11-for-cbse",
        "physics-grade-11-for-cbse",
        "physics-grade-12-for-cbse",
        "chemistry-grade-11-for-cbse",
        "chemistry-for-grade-12-for-cbse",
        "biology-grade-11-for-cbse",
        "biology-grade-12-for-cbse",
        "physical-education-grade-11-for-cbse",
        "physical-education-for-grade-12-for-cbse",
        "psychology-for-grade-11-cbse"
    ]
    
    urls = []
    # format: 2026-08-02T15:12:07+00:00 (we will use current UTC time)
    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S+00:00")
    
    # Root
    urls.append((f"{BASE_URL}/", now, "daily", get_priority(0)))
    
    for book in books:
        book_dir = os.path.join(".", book)
        if not os.path.isdir(book_dir):
            continue
            
        urls.append((f"{BASE_URL}/{book.lower()}/", now, "daily", get_priority(1)))
        
        for root, dirs, files in os.walk(book_dir):
            for file in files:
                if file.endswith(".html") and file not in ["index.html", "404.html", "print.html", "toc.html"]:
                    rel_path = os.path.relpath(os.path.join(root, file), ".")
                    # replace backslashes
                    rel_path = rel_path.replace("\\", "/")
                    # remove .html for clean urls
                    # mdbook output urls often don't have .html for standard pages if hosted correctly, 
                    # but looking at the previous sitemap, they don't have .html.
                    # e.g., /cs-grade-12-for-cbse/introduction
                    rel_path = rel_path[:-5]
                    depth = rel_path.count("/")
                    
                    loc = f"{BASE_URL}/{rel_path.lower()}"
                    urls.append((loc, now, "daily", get_priority(depth + 1)))

    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<?xml-stylesheet href="sitemap_files/sitemap.css" type="text/css"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    
    for loc, lastmod, changefreq, priority in urls:
        xml_content += '  <url>\n'
        xml_content += f'       <loc>{loc}</loc>\n'
        xml_content += f'       <lastmod>{lastmod}</lastmod>\n'
        xml_content += f'       <changefreq>{changefreq}</changefreq>\n'
        xml_content += f'       <priority>{priority}</priority>\n'
        xml_content += '  </url>\n'
    
    xml_content += '</urlset>\n'
    
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(xml_content)
    print("Sitemap generated.")

if __name__ == "__main__":
    generate()
