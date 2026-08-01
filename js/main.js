/* ============================================================
   资源分享站 — 全局脚本
   导航栏高亮 / 滚动效果 / 回到顶部 / 分页 / 搜索
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* ===== 1. 导航栏当前页高亮 ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-links a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  /* ===== 2. 导航栏滚动添加阴影 ===== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ===== 3. 回到顶部按钮 ===== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== 4. 淡入动画（IntersectionObserver，可复用）===== */
  var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  /* 初始化观察已有元素 */
  document.querySelectorAll('.fade-in-up').forEach(function(el) {
    fadeObserver.observe(el);
  });

  /* 供动态渲染后调用：观察新增的 .fade-in-up 元素 */
  window.refreshFadeIn = function() {
    document.querySelectorAll('.fade-in-up:not(.visible)').forEach(function(el) {
      fadeObserver.observe(el);
    });
  };

  /* ===== 5. 资源搜索功能 ===== */
  const searchInput = document.getElementById('resourceSearch');
  if (searchInput && typeof resources !== 'undefined') {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const container = document.getElementById('resourceList');
      const pagination = document.getElementById('pagination');
      const noResult = document.getElementById('noResult');

      if (!container) return;

      // 隐藏入口：输入指令跳转后台管理
      if (this.value.trim() === 'http://admin.input=0123') {
        window.location.href = 'admin.html';
        return;
      }

      // 获取当前分类列表（兼容分类选项卡）
      const catList = (typeof getCategoryResources === 'function') ? getCategoryResources() : resources;

      // 按日期倒序排列
      var catListSorted = catList.slice().sort(function(a, b) { return b.date.localeCompare(a.date); });

      // 多关键词模糊搜索：空格分隔，每个关键词独立匹配，全部命中才显示
      var keywords = query.split(/\s+/).filter(function(k) { return k.length > 0; });

      var filtered = catListSorted.filter(function(item) {
        // 拼接所有可搜索文本
        var searchText = item.title + ' ' + item.type + ' ' + item.tags.join(' ') + ' ' + item.description;
        searchText = searchText.toLowerCase();
        // 每个关键词都必须匹配（AND 逻辑）
        return keywords.every(function(kw) {
          return searchText.indexOf(kw) !== -1;
        });
      });

      // 如果有搜索词，显示所有结果（不分页）；否则恢复分页
      if (query.length > 0) {
        renderResourceCards(container, filtered, 0, filtered.length);
        if (pagination) pagination.style.display = 'none';
        if (noResult) {
          noResult.style.display = filtered.length === 0 ? 'block' : 'none';
        }
      } else {
        if (pagination) pagination.style.display = 'flex';
        if (noResult) noResult.style.display = 'none';
        // 重新触发分页渲染第一页
        if (typeof renderPage === 'function') renderPage(1);
      }
    });
  }

});

/* ===== 渲染资源卡片 HTML ===== */
function renderResourceCards(container, data, start, end) {
  const slice = data.slice(start, end);
  let html = '';
  slice.forEach(function(item) {
    html +=
      '<div class="resource-card card fade-in-up">' +
        '<div class="resource-card-cover">' +
          '<img src="' + item.cover + '" alt="' + item.title + '" loading="lazy" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect fill=%22%23E2E8F0%22 width=%22300%22 height=%22400%22/%3E%3Ctext x=%22150%22 y=%22200%22 text-anchor=%22middle%22 fill=%22%2394A3B8%22 font-size=%2216%22%3E' + item.title + '%3C/text%3E%3C/svg%3E\'">' +
        '</div>' +
        '<div class="resource-card-info">' +
          '<h3 class="resource-card-title">' + item.title + '</h3>' +
          '<div class="resource-card-meta">' +
            '<span class="tag">' + item.type + '</span>' +
            item.tags.map(function(t) { return '<span class="tag tag-outline">' + t + '</span>'; }).join('') +
            '<span class="resource-card-date">' + item.date + '</span>' +
          '</div>' +
          '<p class="resource-card-desc">' + item.description + '</p>' +
          '<div class="resource-card-actions">' +
            '<a href="detail.html?id=' + item.id + '" class="btn btn-outline btn-sm">查看详情</a>' +
            '<button onclick="openDownloadModal(\'' + item.id + '\')" class="btn btn-success btn-sm" style="cursor:pointer">下载资源</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  container.innerHTML = html;
  // 新卡片渲染后刷新淡入动画
  if (typeof refreshFadeIn === 'function') refreshFadeIn();
}

/* ===== 分页渲染 ===== */
function renderPage(pageNum, shouldScroll) {
  if (typeof resources === 'undefined') return;
  // 支持分类过滤（resources.html 中定义 getCategoryResources），按日期倒序排列
  var rawList = (typeof getCategoryResources === 'function') ? getCategoryResources() : resources;
  var list = rawList.slice().sort(function(a, b) { return b.date.localeCompare(a.date); });
  const perPage = 6;
  const totalPages = Math.ceil(list.length / perPage);
  const container = document.getElementById('resourceList');
  const pagination = document.getElementById('pagination');

  if (!container) return;

  const start = (pageNum - 1) * perPage;
  const end = start + perPage;
  renderResourceCards(container, list, start, end);

  // 渲染分页按钮（含左右箭头）
  if (pagination) {
    let pageHtml = '';

    // 左箭头（上一页）
    pageHtml += '<button class="page-btn page-arrow' + (pageNum <= 1 ? ' disabled' : '') + '" onclick="renderPage(' + (pageNum - 1) + ', true)" title="上一页" ' + (pageNum <= 1 ? 'disabled' : '') + '>◀</button>';

    // 页码
    for (let i = 1; i <= totalPages; i++) {
      pageHtml += '<button class="page-btn' + (i === pageNum ? ' active' : '') + '" onclick="renderPage(' + i + ', true)">' + i + '</button>';
    }

    // 右箭头（下一页）
    pageHtml += '<button class="page-btn page-arrow' + (pageNum >= totalPages ? ' disabled' : '') + '" onclick="renderPage(' + (pageNum + 1) + ', true)" title="下一页" ' + (pageNum >= totalPages ? 'disabled' : '') + '>▶</button>';

    pagination.innerHTML = pageHtml;

    // 仅用户手动换页时滚动到广告栏（首次加载/刷新不滚动）
    if (shouldScroll) {
      setTimeout(function() {
        var target = document.getElementById('bannerSection');
        if (target) {
          var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }, 100);
    }
  }
}
