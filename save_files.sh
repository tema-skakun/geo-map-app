#!/bin/bash

# Выходной файл
output_file="all_code.txt"

# Очистка выходного файла, если он существует
> "$output_file"

# Функция для обработки каждого файла
process_file() {
    local file_path="$1"
    # Убираем первые два символа (./) из пути
    local clean_path="${file_path#./}"
    # Проверяем, есть ли уже путь в первой строке файла
    first_line=$(awk 'NR==1 {print; exit}' "$file_path")
    if [[ "$first_line" != "// $clean_path" ]]; then
        echo "// $clean_path" >> "$output_file"
    fi
    cat "$file_path" >> "$output_file"
    echo -e "\n" >> "$output_file"  # Добавляем две пустые строки после содержимого файла
}

# Рекурсивный обход всех файлов в текущей директории,
# исключая ненужные директории и файлы
find . -type f \
    -not -path "./.next/*" \
    -not -path "./dist/*" \
    -not -path "./src/components/icons/*" \
    -not -path "./node_modules/*" \
    -not -path "./.DS_Store/*" \
    -not -path "./.git/*" \
    -not -path "./public/*" \
    -not -path "./.idea/*" \
    -not -name ".DS_Store" \
    -not -name "*package*" \
    -not -name "yarn*" \
    -not -name ".gitignore" \
    -not -name "*env.d.ts" \
    -not -name "*.txt" \
    -not -name "*.sh" \
    -not -name "*.ico" \
    -not -name "*.svg" \
    -not -name "*.png" \
    -not -name "*.yml" \
    -not -name "*.md" \
    -not -name "tsconfig.*" \
    -print0 | while IFS= read -r -d '' file; do
    process_file "$file"
done

echo "All code has been collected in $output_file"
