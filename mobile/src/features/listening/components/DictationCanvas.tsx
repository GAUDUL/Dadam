import { View, StyleSheet } from "react-native";
import Signature from "react-native-signature-canvas";

export default function DictationCanvas({ signRef, onOK }: any) {
  return (
    <View style={styles.canvasWrapper}>
      <Signature
        ref={signRef}
        onOK={onOK}
        onEmpty={() => {}}
        autoClear={false}
        penColor="black"
        backgroundColor="white"
        style={styles.signature}
        webStyle={webStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  canvasWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 400,
    marginBottom: 16,
    overflow: "hidden",
    width: "100%",
  },
  signature: { flex: 1 },
});

const webStyle = `
  body, html { margin:0; padding:0; height:100%; background-color:transparent; }
  .m-signature-pad { box-shadow:none; border:none; margin:0; height:100%; }
  .m-signature-pad--body { border:none; height:100%; }
  canvas {
    margin:0 !important;
    height:100% !important;
    width:100% !important;
    background-color:white !important;
  }
  .m-signature-pad--footer { display:none; height:0; }
`;
