#!/bin/bash
# 重启服务器脚本

echo "正在停止现有服务器..."

# 查找并关闭 Flask 进程
pkill -f "run_web.py" 2>/dev/null
pkill -f "app.py" 2>/dev/null
pkill -f "flask run" 2>/dev/null

sleep 2

echo "清理端口..."
# 关闭占用 5000-5010 端口的 Python 进程
for port in {5000..5010}; do
    lsof -ti:$port 2>/dev/null | xargs kill -9 2>/dev/null
done

sleep 1

echo "启动新服务器..."
python3 run_web.py

