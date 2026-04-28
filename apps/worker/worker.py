import redis
import time
import json

r = redis.from_url("redis://localhost:6379/0")

def process_ingestion_task(task_data):
    print(f"Processing ingestion for document: {task_data['doc_id']}")
    # Simulate OCR, Chunking, and Embedding
    time.sleep(2)
    print(f"Successfully indexed {task_data['doc_id']}")

if __name__ == "__main__":
    print("Worker started. Waiting for tasks...")
    while True:
        task = r.blpop("ingestion_queue", timeout=10)
        if task:
            data = json.loads(task[1])
            process_ingestion_task(data)
