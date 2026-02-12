#!/bin/bash
# 关闭占用指定端口的进程

PORT=${1:-5000}

echo "查找占用端口 $PORT 的进程..."

PIDS=$(lsof -ti:$PORT 2>/dev/null)

if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 未被占用"
    exit 0
fi

echo "找到以下进程占用端口 $PORT:"
ps -p $PIDS -o pid,comm,args

read -p "是否关闭这些进程? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "正在关闭进程..."
    kill -9 $PIDS 2>/dev/null
    sleep 1
    if lsof -ti:$PORT >/dev/null 2>&1; then
        echo "⚠️  部分进程可能仍在运行"
    else
        echo "✅ 端口 $PORT 已释放"
    fi
else
    echo "已取消"
fi

