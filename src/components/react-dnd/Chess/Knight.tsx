import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const knightStyle: React.CSSProperties = {
  fontSize: 60,
  fontWeight: 'bold',
  cursor: 'move',
  textAlign: 'center',
  lineHeight: '4rem',
};

const Knight = () => {

  // ドラッグ操作を管理するためのhooks, useDrag()
  // useDrag の返り値の配列の第一要素には、collect() 関数が返すオブジェクトが入る
  // 2つ目の要素は、connector() 関数で、これによってドラッグ中のオブジェクト(Item) とDOM の要素が関連づけされる
  // ドラッグするJSXノードのref プロパティに、drag を渡す
  const [{ isDragging }, drag] = useDrag(() => (
    {
      // typeは、item オブジェクトを識別するプロパティ
      type: ItemTypes.KNIGHT,
      // collect()は、引数のmonitorからドラッグするオブジェクトの状態として用いるプロパティを取り出し、
      // オブジェクトにして返す
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }
  ));

  return (
    <div
      style={{
        ...knightStyle,
        opacity: isDragging ? 0.5 : 1, // ドラッグ中は半透明にする
      }}
      ref={drag} // useDrag() hooks から取り出したdragを渡す
    >
      ♘
    </div>
  );
};

export { Knight };
