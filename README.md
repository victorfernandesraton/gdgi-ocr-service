# GDGI OCR Service

OCR PDFs and convert to PDF/A using ocrmypdf.

Build with:
```shell
docker build -t gdgi-ocr-service .
```

Launch with:
```shell
docker run -p 8888:8080 --name gdgi-ocr-service gdgi-ocr-service
```

Test with:
```html
<form action="http://localhost:8888/ocr?params=-l por" method="post" enctype="multipart/form-data">
    <p><input type="file" name="file">
        <p><button type="submit">Submit</button>
</form>
```