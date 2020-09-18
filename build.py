import frontmatter
from jinja2 import Environment, FileSystemLoader
from bs4 import BeautifulSoup

index_path = 'src/content/index.md'
include_dir = 'src/_includes'

pf = frontmatter.load(index_path)

env = Environment(loader=FileSystemLoader(include_dir))
template = env.get_template(pf['layout'])

site = {"favicon": "/favicon.ico",
        "navigations": [
            {"path": "/", "text": "Home"},
            {"path": "/about", "text": "About"}
        ]}

rendered = template.render(
    site=site,
    content=pf.content,
    title=pf['title']
)

soup = BeautifulSoup(rendered)
print(soup.prettify())
