#!/bin/bash
# EHR Agent Web 应用启动脚本

echo "============================================================"
echo "EHR Agent Web 应用启动检查"
echo "============================================================"

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 python3"
    exit 1
fi

# 检查依赖
echo "检查依赖..."
python3 -c "import flask" 2>/dev/null || {
    echo "❌ Flask 未安装，正在安装..."
    pip install flask flask-cors
}

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "⚠️  警告: .env 文件不存在"
    echo "请创建 .env 文件并设置 GOOGLE_API_KEY"
fi

# 检查文件结构
echo "检查文件结构..."
[ -d "templates" ] || { echo "❌ templates 目录不存在"; exit 1; }
[ -d "static" ] || { echo "❌ static 目录不存在"; exit 1; }
[ -f "templates/index.html" ] || { echo "❌ templates/index.html 不存在"; exit 1; }
[ -f "static/css/style.css" ] || { echo "❌ static/css/style.css 不存在"; exit 1; }
[ -f "static/js/app.js" ] || { echo "❌ static/js/app.js 不存在"; exit 1; }

echo "✅ 所有检查通过"
echo ""
echo "启动 Web 应用..."
echo "访问地址: http://localhost:5000"
echo "按 Ctrl+C 停止服务器"
echo "============================================================"

python3 run_web.py

