import { useState } from 'react';
import styles from '../scss/components/CollapseMenu.module.scss';
import PlusSvg from './ui/PlusSvg';

const CollapseMenu = ({ title, classes, data = [] }) => {
  const [collapse, setCollapse] = useState([...data]);

  if (data.length === 0) return null;

  function toggleCollapseMenu(id) {
    let elements = [...collapse];
    const index = elements.findIndex((el) => el.id === id);
    elements[index].collapsed = !elements[index].collapsed;

    setCollapse(elements);
  }

  return (
    <div className={classes || null}>
      <div className={styles.title}>{title || 'No title available'}</div>

      <div className={styles.collapseWrapper}>
        {collapse.map((element) => (
          <button
            key={element.id}
            onClick={() => toggleCollapseMenu(element.id)}
            className={`${styles.collapseElement} ${element.collapsed && styles.collapsed}`}
          >
            {element.title && (
              <div className={styles.titleWrapper}>
                <div className={styles.elementTitle}>{element.title}</div>
                <div className={styles.plus_svg}>
                  <PlusSvg />
                </div>
              </div>
            )}

            {element.content && (
              <div className={`${styles.collapseContent} ${element.collapsed && styles.collapsed}`}>
                {element.content}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollapseMenu;
