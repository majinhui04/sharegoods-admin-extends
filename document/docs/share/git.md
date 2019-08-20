## git 常用操作总结

```bash
$ git diff branch1 branch2                          # 显示出所有有差异的文件的详细差异
$ git diff branch1 branch2 --stat                # 显示出所有有差异的文件列表
$ git diff branch1 branch2 文件名(带路径)     # 显示指定文件的详细差异
 
$ git remote set-url origin http://新仓库地址       # 直接修改整个仓库的地址
$ git branch --set-upstream-to=origin/master   # 修改当前本地分支的跟踪

$ git version   # → git版本

$ git branch   # → 查看本地所有的分支

$ git branch -r # → 查看所有远程的分支

$ git branch -a # → 查看所有远程分支和本地分支

$ git branch -d <branchname> # → 删除本地branchname分

$ git branch -m brancholdname branchnewname # → 重命名分支

$ git branch <branchname> # → 创建branchname分支

$ git checkout <branchname> # → 切换分支到branchname

$ git checkout -b <branchname> # → 等同于执行上两步，即创建新的分支并切换到该分支

$ git checkout -- xx/xx # → 回滚单个文件

$ git pull origin master:master # → 将远程origin主机的master分支合并到当前master分支,冒号后面的部分表示当前本地所在的分支

$ git push origin -d <branchname>   # → 删除远程branchname分支

$ git fetch --p# → 更新分支
$ git status # → 查看仓库状态

$ git add xx # → 把xx文件添加到暂存区去

$ git commit -m ' '  # → 提交文件 -m 后面的是注释(不建议使用👎)

$ git commit -am(-a -m) # → 提交所有的修改，等同于上两步(不建议使用👎)

$ git commit ./xx   # → 等同于git add ./xx + git commit（建议使用👍）

$ git commit --amend # → 将暂存区和当前commit合并创建一个新commit去替换当前commit

$ git stash # → 把当前的工作隐藏起来 等以后恢复现场后继续工作

$ git stash pop # → 恢复工作现场（恢复隐藏的文件，同时删除stash列表中对应的内容）

$ git fetch --all  # → 将远程主机的更新全部取回本地
$ git merge origin/master  # → 在本地（当前）分支上合并远程分支

$ git merge --abort  # → 终止本次merge，并回到merge前的状态（👍）

$ git pull origin master  # → 从远程获取最新版本并merge到本地等同于

$ git fetch origin master + $ git merge origin/master（前者更安全一些）
$ git push origin master   # → 将本地master分支推送到远程origin主机的master分支

$ git log xx  # → 查看xx文件的commit记录

$ git log -p xx   # → 查看xx文件每次提交的diff
$ git log --pretty=oneline xx  # → 查看xx文件提交的历史记录（只显示哈希值和提交说明）

$ git log --pretty=raw  # → 查看commit之间的父子关系（root commit是没有父提交的）
$ git log --graph  # → 查看当前分支commit生成的树状图

$ git diff HEAD HEAD^1 -- xx  # → 查看xx文件不同版本之间的差异
$ git diff HEAD~1  # → 显示父节点的提交

$ git diff --staged/--cached  # → 显示暂存区和上一次提交的不同，git add之前忘diff的后悔药（👍）

$ git show --stat  # → 查看最后一次的修改

$ git show HEAD  # → 查看指定版本的修改（可省略HEAD，默认当前版本） 同上

$ git show HEAD xxx  # → 查看指定版本xx文件的修改（可省略HEAD，默认当前版本）

$ git reset --hard HEAD  # → 回滚到指定版本，同时清空工作目录的所有改动
$ git reset --soft HEAD  # → 回滚到指定版本，同时保留工作目录和暂存区的内容，并把重置的位置所导致的新的文件差异放进暂存区（👍）

$ git reset --mixed HEAD  # → （默认）回滚到指定版本，同时保留工作目录的内容，并清空暂存区（👍）

$ git reset --hard origin/master  # → 将本地master与远程master同步

$ git reflog show --date=iso <branch name>  # → 查看分支的创建时间

$ git branch -r | awk '{print $1}' | egrep -v -f /dev/fd/0 <(git branch -vv | grep origin) | awk '{print $1}' | xargs git branch -d  # → 删除在远程已被删除的本地分支 (慎用)

$ git remote show origin  # → 查看remote地址，远程分支，还有本地分支与之相对应关系等信息。

$ git remote prune origin  # → 删除了那些远程仓库不存在的分支 === git fetch -p
$ git config  # → 查看和编辑git的配置


$ git rebase master  # → 在当前分支对master执行rebase
$ git rebase -i 目标commit  # → 修改历史某一次提交

$ git push origin <brancename> -f  # → 忽略冲突，强制提交
$ git revert HEAD  # → 撤销指定的commit（👍）

$ git reflog HEAD  # → 查看git仓库中引用的移动记录，默认显示HEAD的移动记录

$ git checkout HEAD(c08de9a)  # → c08de9a为brance删除之前所在的位置

$ git checkout -b <brancename>  # → 重新创建<brancename>，找回删除的分支

$ git tag  # → 列出所有<code>tag</code>
$ git tag -l version1.*  # → 只会列出1.几的版本

$ git tag <tagname>(version 1.0)  # → 创建轻量级的<code>tag</code>
$ git tag -a <tagname>(version1.0) -m 'first version'  # → 创建带有信息的<code>tag</code>

$ git tag -d <tagname>(version 1.0)  # → 删除指定<code>tag</code>
$ git checkout <tagname>(version 1.0)  # → 检出指定<code>tag</code>

```


### git中‘~’和‘^’的区别

```bash
(<commit>|HEAD)^n，指的是HEAD的第n个父提交，可以通过在“^”后面跟上一个数字，表示第几个父提交，“^”相当“^1”。例如：HEAD^2 表示HEAD的第二次父提交。(<commit>|HEAD)~n，指的是HEAD的第n个祖先提交，可以通过在“~”后面跟上一个数字，表示第几个祖父提交，“~”相当“~1”，“~n”相当于连续的<n>个“^”。例如：HEAD~2 表示HEAD的第一个父提交的第一个父提交。

等式1：HEAD~ === HEAD^ === HEAD^1 

等式2：HEAD~2 === HEAD^^ === HEAD^1^1
```



### 配置

```bash
查看
格式：git config [--local|--global|--system] -l

$ git config --local -l  # → 查看仓库级的config
$ git config --global -l  # → 查看全局级的config
 
编辑
格式：git config [--local|--global|--system] -e

$ git config --local -e # → 编辑仓库级的config
$ git config --global -e # → 编辑全局级的config
 
修改
格式：git config [--local|--global|--system] section.key value

$ git config --local push.default 'simple'  # → 修改仓库级的push.default的默认行为
$ git config --global push.default 'current'  # → 修改全局级的push.default的默认行为
 
* 关于git default配置这里
增加

格式: git config [--local|--global|--system] --add section.key value(默认是添加在local配置中)

$ git config --add cat.name songhw  # → local配置写入 cat.name = songhw
$ git config --local --add cat.name songhw  # → 等同于上一步
$ git config --global --add cat.name lhammer  # → global配置写入 cat.name = lhammer
 
获取
格式：git config [--local|--global|--system] --get section.key(默认是获取local配置中内容)

$ git config --get cat.name  # → 输出songhw
$ git config --local --get cat.name  # → 输出结果同上一步
$ git config --global --get cat.name  # → 输出lhammer
 
删除
格式：git config [--local|--global|--system] --unset section.key

$ git config --local --unset cat.name # → 删除local配置中的cat.name = songhw
$ git config --global --unset cat.name # → 删除local配置中的cat.name = lhammer
```
