class PeerService {
  constructor() {
    this.peer = null;
    this.initializePeer();
  }

  initializePeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    this.setupPeerListeners();
  }

  setupPeerListeners() {
    if (!this.peer) return;

    this.peer.addEventListener("track", (event) => {
      console.log("Received remote track", event);
    });

    this.peer.addEventListener("negotiationneeded", async () => {
      console.log("Negotiation needed");
      try {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        console.log("Local description set with offer:", offer);
        // Send the offer to the remote peer using your signaling server
      } catch (error) {
        console.error("Error during negotiation:", error);
      }
    });

    this.peer.addEventListener("icecandidate", (event) => {
      console.log("ICE candidate event:", event);
      if (event.candidate) {
        console.log("New ICE candidate", event.candidate);
        // Send the candidate to the remote peer using your signaling server
      }
    });

    this.peer.addEventListener("connectionstatechange", () => {
      console.log("Connection state changed:", this.peer.connectionState);
      if (this.peer.connectionState === "closed") {
        this.initializePeer();
      }
    });
  }

  reinitializePeer() {
    if (this.peer) {
      this.peer.close();
    }
    this.initializePeer();
  }

  async getOffer() {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      return null;
    }
  }

  async getAnswer(offer) {
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error creating answer:", error);
      return null;
    }
  }

  async setLocalDescription(description) {
    console.log("Setting local description:", description);
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setLocalDescription(
        new RTCSessionDescription(description)
      );
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }

  async setRemoteDescription(description) {
    console.log("Setting remote description:", description);
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.setRemoteDescription(
        new RTCSessionDescription(description)
      );
    } catch (error) {
      console.error("Error setting remote description:", error);
    }
  }

  async addIceCandidate(candidate) {
    console.log("Adding ICE candidate:", candidate);
    if (!this.peer || this.peer.signalingState === "closed") {
      this.reinitializePeer();
    }

    try {
      await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }
}

export default new PeerService();
