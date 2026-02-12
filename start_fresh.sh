#!/bin/bash
# 全新启动脚本 - 清理并启动

echo "============================================================"
echo "EHR Agent Web 应用 - 全新启动"
echo "============================================================"

# 1. 停止所有相关进程
echo "1. 停止旧进程..."
pkill -f "run_web.py" 2>/dev/null
pkill -f "app.py" 2>/dev/null
pkill -f "flask" 2>/dev/null
sleep 2

# 2. 清理端口（可选，不强制）
echo "2. 检查端口占用..."
for port in 5000 5001 5003 5004 5005; do
    if lsof -ti:$port >/dev/null 2>&1; then
        echo "   ⚠️  端口 $port 被占用（应用会自动选择其他端口）"
    fi
done

# 3. 检查文件
echo "3. 检查必要文件..."
[ -f "templates/index.html" ] && echo "   ✅ 模板文件存在" || echo "   ❌ 模板文件缺失"
[ -f "static/css/style.css" ] && echo "   ✅ CSS 文件存在" || echo "   ❌ CSS 文件缺失"
[ -f "static/js/app.js" ] && echo "   ✅ JS 文件存在" || echo "   ❌ JS 文件缺失"

# 4. 检查 API Key
echo "4. 检查配置..."
if [ -f ".env" ]; then
    if grep -q "GOOGLE_API_KEY=" .env && ! grep -q "GOOGLE_API_KEY=your_" .env; then
        echo "   ✅ API Key 已配置"
    else
        echo "   ⚠️  API Key 未配置或使用默认值"
    fi
else
    echo "   ⚠️  .env 文件不存在"
fi

# 5. 启动应用
echo ""
echo "5. 启动应用..."
echo "============================================================"
echo ""

cd "$(dirname "$0")"
python3 run_web.py

