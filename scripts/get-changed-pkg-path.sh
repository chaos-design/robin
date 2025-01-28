#!/bin/bash

# 获取所有发生变更的文件列表
changed_files=$(git diff --cached --name-only)

# 初始化变量用于存储包路径字符串
tag_name=""
package_paths=""
filter_package_paths=""

# 遍历发生变更的文件列表
for file in $changed_files; do
  # 提取文件所在目录路径
  directory=$(dirname "$file")
  
  # 检查目录路径是否包含 packages 关键字且不包含 src 关键字
  if [[ $directory == *"packages"* ]]; then
    # 向上查找，直到找到包含 package.json 的目录或者到达 packages 目录
    while [ "$directory" != "${directory%/packages*}/packages" ]; do
      if [ -f "$directory/package.json" ]; then
        name=$(basename "$directory")
        echo "文件名: $name"

        # 使用 grep 和 sed 提取 version 字段的值
        version=$(grep '"version":' "$directory/package.json" | sed 's/.*"version": *"//;s/".*//')
        tag_name="v$tag_name-$name-$version"

        echo "package version: $version"

        filter_package_paths="\"./$package_paths$directory...\" "
        # 拼接 package.json 的路径，并添加到 package_paths 变量中
        package_paths="$package_paths$directory/package.json "
        break
      fi
      directory=$(dirname "$directory")
    done
  fi
done

# 打印发生内容更新的包的package.json的路径字符串
echo "发生内容更新的包的package.json的路径：\n$package_paths"
echo "发生内容更新的包的版本：\n$tag_name"

filename="cache-changed-pkg-path.sh"

if [ ! -f "$filename" ]; then
  touch "$filename"
  echo "[$filename] File created successfully."
fi

if [ -z "$tag_name" ]; then
  echo "tag_name is empty. Skipping file creation."
else
  echo "bumpp $package_paths-t $tag_name" > "$filename"
fi

publish_filename="cache-changed-pkg-publish-path.sh"

if [ ! -f "$publish_filename" ]; then
  touch "$publish_filename"
  echo "[$publish_filename] File created successfully."
fi

cat << EOF > "$publish_filename"
#!/bin/bash

pnpm -r --filter $filter_package_paths exec pnpm publish --access public --no-git-checks
EOF