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

Deploy no GCloud:

Para fazer o build, usar um CMD fora do VSCode:
cd \Repositories\gdgi-ocr-service
gcloud config set project opusfacere
gcloud builds submit --tag gcr.io/opusfacere/gdgi-ocr-service-v1.0.0 .


Criar serviço no Cloud Run:
- Container port 8080
- Startup CPF boost: true
- CPU is only allocated during request processing
- Memory: 4GiB
- CPU: 2
- Request timeout: 300
- Maximum concurrent requests per instance: 5
- Execution environment: Default
- Minimum number of instances: 0
- Maximum number of instances: 1
- Probe every 240s

Ou fazer pelo command line:
gcloud run deploy gdgi-ocr-service-v1-0-0 \
--image=gcr.io/opusfacere/gdgi-ocr-service-v1.0.0@sha256:f805fe3451b7a281aec2113cdf99356bf3d2a14773ac6024386e1bdb313e176b \
--region=us-west1 \
--project=opusfacere \
 && gcloud run services update-traffic gdgi-ocr-service-v1-0-0 --to-latest